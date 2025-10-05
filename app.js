const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); 
const PORT = 3000;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public"))); // هيعرض HTML من فولدر public

app.set("view engine", "ejs");
app.set("public", "public");

// Routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

const examRoutes = require("./routes/exam");
app.use(examRoutes);

const questionRoutes = require("./routes/question");
app.use(questionRoutes);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://mohammedasharf8:962616Mm%40%23@mycluster.ysbgqd2.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log("✅ CONNECTED TO DATABASE");
    });
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome To Quizz App");
});
