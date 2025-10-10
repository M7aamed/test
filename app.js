const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const flash = require('connect-flash');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sessions
app.use(
  session({
    secret: "secret-key", 
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session?.isLoggedIn || false;
  next();
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


const authRoutes = require("./routes/auth");
app.use(authRoutes);

mongoose
  .connect("mongodb+srv://mohammedasharf8:962616Mm%40%23@mycluster.ysbgqd2.mongodb.net/shop").then(result=>{
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));




