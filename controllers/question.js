const Question = require("../models/question.js");

// create Question

exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;

    if (!text || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "text and option array required (at least 2)" });
    }
    if (typeof correctAnswer !== "number" || correctAnswer < 0 || correctAnswer >= options.length) {
      return res.status(400).json({ error: "valid correctAnswer index required" });
    }

    const question = new Question({
      text,
      options,
      correctAnswer,
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//Get question By Fuckin Id
exports.getQuestion = async (req , res) =>{

    try{

        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({error: "Question Not Found "});
        }
        res.json(question);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }

};

