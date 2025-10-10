const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgrirTransport = require("nodemailer-sendgrid-transport");



exports.getRegister = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("register", {
    path: "/register",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.getLogin = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postRegister = async (req, res) => {
  const { fullName, userName, email, password, conPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User Alreary Exsist !");
    }

    if (password !== conPassword) {
      req.flash("error", "Wrong Password Dont Match  !");
    }

    return bcrypt.hash(password, 12).then((hashedPw) => {
      const user = new User({ fullName, userName, email, password: hashedPw });
      user.save();
    }).then(result =>{
      res.redirect("/login");
    return transporter.sendMail({
      to: email,
      from: "quiz.app.ad@gmail.com",
      subject: "SignUp Successed",
     html: `
  <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <div style="background-color: #4CAF50; color: white; padding: 15px 20px; text-align: center;">
        <h2>🎉 Welcome to Quiz App!</h2>
      </div>
      <div style="padding: 20px; color: #333;">
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>We're excited to have you on board! Your account has been created successfully.</p>
        <p>Now you can log in and start testing your knowledge 💪</p>

        <a href="https://yourdomain.com/login" 
          style="display:inline-block; margin-top:15px; padding:10px 20px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px;">
          Login to Your Account
        </a>

        <p style="margin-top:20px; font-size:14px; color:#555;">
          If you didn’t create this account, please ignore this email.
        </p>
      </div>
      <div style="background-color:#f1f1f1; text-align:center; padding:10px; font-size:12px; color:#777;">
        © 2025 Quiz App. All rights reserved.
      </div>
    </div>
  </div>
`

    });
    })
  } catch (err) {
    console.log(err);
    req.flash("error", "Error  !");
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid Email Or Password");
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials!");
      return res.redirect("/login");
    }

    // ✅ حفظ بيانات الـ session
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.userName = user.userName;

    // لازم تحفظ الـ session قبل التحويل (عشان تتخزن فعليًا)
    req.session.save((err) => {
      if (err) console.log(err);
      res.redirect("/main");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Invalid credentials!");
    return res.redirect("/login");
  }
};


exports.getMainPage = (req, res) => {
  if (!req.session.userName) {
    return res.redirect("/login");
  }

  res.render("mainpage", { userName: req.session.userName });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};
