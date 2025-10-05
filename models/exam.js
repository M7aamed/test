const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    title:{type:String , required : true},
    description:{type:String},
    question:[{type:Schema.Types.ObjectId , ref:'Question'}],
    createdAt:{type:Date , default:Date.now},
});

module.exports = mongoose.model('Exam' , examSchema);