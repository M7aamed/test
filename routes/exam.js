const express = require("express");
const router = express.Router();
const examController = require('../controllers/exam');


router.post('/create' , examController.createExam);
router.get('/:id' , examController.getExam);

module.exports = router;