const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExaminerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    exams: [
        {
            examName: String,
            startDateTime: Date,
            endDateTime: Date,
            totalMarks: Number,
            questionBankId: String,
            candidates: [
                {
                    candidateId: String,
                    candidateName: String,
                    candidatePassword: String,
                    hasAppeared: Boolean,
                    Marks: Number,
                    responses: [
                        {
                            questionType: String,
                            questionId: String,
                            optionId: String,
                            code: String,
                        },
                    ],
                },
            ],
        },
    ],
    classes: [
        {
            className: String,
            candidates: [
                {
                    candidateId: String,
                    candidateName: String,
                    candidateEmail: String,
                },
            ],
        },
    ],
    questionBanks: [
        {
            questionBankName: String,
            questions: [
                {
                    marks: Number,
                    value: String,
                    questionType: String,
                    snippetUrl: String,
                    options: [
                        {
                            value: String,
                        },
                    ],
                    correctOptionValue: String,
                },
            ],
        },
    ],
});

module.exports = mongoose.model("examiner", ExaminerSchema);
