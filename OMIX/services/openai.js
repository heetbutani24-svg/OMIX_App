import axios from 'axios';

const API_URL = 'http://localhost:5000/generate';

export const generateNotesQuiz = async (topic) => {
  try {
    const response = await axios.post(API_URL, { topic });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'AI generation failed');
  }
};
