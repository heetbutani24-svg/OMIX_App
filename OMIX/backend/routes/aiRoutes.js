const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: 'YOUR_OPENAI_API_KEY' });
const openai = new OpenAIApi(configuration);

router.post('/', async (req,res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ message:'Topic is required' });

  try {
    const notesPrompt = `Generate simplified notes for students on: ${topic}`;
    const quizPrompt = `Generate 10 multiple choice questions on: ${topic}`;

    const notesResponse = await openai.createCompletion({ model:'text-davinci-003', prompt:notesPrompt, max_tokens:500 });
    const quizResponse = await openai.createCompletion({ model:'text-davinci-003', prompt:quizPrompt, max_tokens:700 });

    const quizLines = quizResponse.data.choices[0].text.split('\n').filter(l=>l.trim());
    let quiz = [], currentQuestion = { question:'', options:[] };
    quizLines.forEach(line => {
      if (/^\d+\./.test(line)) {
        if(currentQuestion.question) quiz.push(currentQuestion);
        currentQuestion = { question:line, options:[] };
      } else if (/^[A-D]\./.test(line)) {
        currentQuestion.options.push(line);
      }
    });
    if(currentQuestion.question) quiz.push(currentQuestion);

    res.json({ notes:notesResponse.data.choices[0].text, quiz });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message:'AI generation failed' });
  }
});

module.exports = router;
