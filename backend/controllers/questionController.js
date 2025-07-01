import Question from "../models/Question.js";
import Session from "../models/Session.js";

// @desc  Add additional questions to an existing session
// @route  POST /api/questions/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        // Create new Questions
        const createdQuestions = await Question.insertMany(questions.map((q) => ({
            session: session._id,
            question: q.question,
            answer: q.answer,
        })));

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json(createdQuestions);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};

// @desc  Pin or unpin a question
// @route  POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};

// @desc  Update a note for a question
// @route  POST /api/questions/:id/note
// @access Private
exports.updatQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        question.note = note;
        await question.save();

        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
}; 