const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth"); 

// GET register page
router.get("/register", authController.getRegister);

// POST register data
router.post("/register", authController.postRegister);

// GET login page
router.get("/login", authController.getLogin);

// POST login data
router.post("/login", authController.postLogin);

module.exports = router;
