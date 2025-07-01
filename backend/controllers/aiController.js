const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc  Generate interview questions and answers using Gemini
// @route  POST /api/ai/generate-questions
// @access Private
exports.generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "missing required fields"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            prompt: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    
        const data = JSON.parse(cleanedText);

        res.status(200).json({ success: true, data });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to generate questions" });
    }
};

// @desc  Generate explains a interview question
// @route  POST /api/ai/generate-explanation
// @access Private
exports.generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if(!question) {
            return res.status(400).json({ message: "missing required fields"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            prompt: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    
        const data = JSON.parse(cleanedText);

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to generate explanation" });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };