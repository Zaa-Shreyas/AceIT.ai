const Session = require("../models/Session.js");
const Question = require("../models/Question.js");

// @desc  Create a session and linked questions
// @route  POST /api/session/create
// @access Private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id; // Assuming you have the user's ID in req.user._id
        const session = await Session.create({ user: userId, role, experience, topicsToFocus, description });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
              const question = await Question.create({
                session: session._id,
                question: q.question,
                answer: q.answer,
                });
                return question._id;  
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true,  session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc  Get all sessions for the logged in user
// @route  GET /api/session/my-sessions
// @access Private
exports.updateMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("questions");
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc  Get a session by ID with populated questions
// @route  GET /api/session/:id
// @access Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1}},
        })
        .exec();

        if (!session) {
            return res
            .status(404)
            .json({ success: false, message: "Session not found" });
        }
        if (!role || !experience || !topicsToFocus) {
        return res.status(400).json({ success: false, message: 'Role, experience, and topicsToFocus are required' });}
        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc  Delete a session by ID
// @route  PUT /api/session/:id
// @access Private
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res
            .status(404)
            .json({ success: false, message: "Session not found" });
        }
        
        // Check if the logged-in user owns the session
        if (session.user.toString() !== req.user._id) {
            return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }

        // First, delete all questions associated with the session
        await Question.deleteMany({ session: session._id });

        // Then, delete the session
        await session.deleteOne();

        res.status(200).json({ success: true, message: "Session deleted successfully" });

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};