const express = require("express");
const router = express.Router();
const questionController = require('../controllers/question');

router.get('/questions/:id' , questionController.getQuestion);
router.post('/questions' , questionController.createQuestion);

module.exports = router;