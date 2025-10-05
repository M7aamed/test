const Exam = require("../models/exam.js");
const Question = require("../models/question.js");

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { title, description, question } = req.body;

    const exam = new Exam({
      title,
      description,
      question,
    });

    await exam.save();
    res.status(201).json({ message: "Exam Created", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Exam by ID
exports.getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("question");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
