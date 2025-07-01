const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
   You are an AI trained to generate technical interview questions and answers.
   
   Task:
   - Role: ${role}
   - Experience: ${experience}
   - Topics to Focus: ${topicsToFocus}
   - Write ${numberOfQuestions} interview questions
   - For each question, generate a detailed but beginner-friendly answer.
   - Add a code block if an example is needed.
   - Keep formatting very clean
   - Return a pure JSON array like:
   [
       {
           "question": "Question here",
           "answer": "Answer here"
           },
           ...
   ]
           Important: Do NOT add any extra text. Only return valid JSON.`);

           const conceptExplainPrompt = (question) => (`
           You are an AI trained to generate explanations for a given interview question.
           
           Task:
           
           - Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
           - Question: "${questions}"
           - After the exaplanation , provide a short and clear title that summarizes the concept for the article or page header.
           - Keep formatting very clean
           - Return a pure JSON array like:
           [
               {
                   "title": "Title here",
                   "explanation": "Explanation here"
                   },
                   ...
           ]
                   Important: Do NOT add any extra text. Only return valid JSON.
           `);

           module.exports = { questionAnswerPrompt, conceptExplainPrompt };