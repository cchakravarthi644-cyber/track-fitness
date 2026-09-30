const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    const prompt =
      'Generate a personalized workout recommendation for a person with the following details:\n' +
      '- Age: ' + age + '\n' +
      '- Fitness Goal: ' + fitnessGoal + '\n' +
      '- Experience Level: ' + experience + '\n\n' +
      'Please keep the recommendation direct, practical, and concise. ' +
      'Do not include greetings, markdown, or bullet points. ' +
      'Provide a clear step-by-step execution plan.';

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No recommendation could be generated.';
  } catch (error) {
    console.error('Gemini Recommendation Error:', error.message);
    throw error;
  }
};

const generateFitnessInsights = async (
  totalWorkouts,
  averageDuration,
  totalCaloriesBurned
) => {
  try {
    const prompt =
      'Analyze this user fitness progress and generate a personalized fitness insight:\n' +
      '- Total Workouts Logged: ' + totalWorkouts + '\n' +
      '- Average Workout Duration: ' + averageDuration + ' minutes\n' +
      '- Total Calories Burned: ' + totalCaloriesBurned + ' kcal\n\n' +
      'Keep the insight direct, actionable, encouraging, and concise.';

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No insight could be generated.';
  } catch (error) {
    console.error('Gemini Insights Error:', error.message);
    throw new Error('Failed to generate fitness insights from Gemini AI');
  }
};

module.exports = {
  generateWorkoutRecommendation,
  generateFitnessInsights,
};