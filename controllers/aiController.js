const geminiService = require('../services/geminiService');

// @desc    Get AI workout recommendation
// @route   POST /api/ai/workout-recommendation
// @access  Private
const getWorkoutRecommendation = async (req, res, next) => {
  try {
    const { age, fitnessGoal, experience } = req.body;

    if (age === undefined || !fitnessGoal || !experience) {
      return res.status(400).json({
        success: false,
        error: 'Please provide age, fitnessGoal, and experience',
      });
    }

    const recommendation =
      await geminiService.generateWorkoutRecommendation(
        age,
        fitnessGoal,
        experience
      );

    res.status(200).json({
      recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI fitness insights
// @route   POST /api/ai/fitness-insights
// @access  Private
const getFitnessInsights = async (req, res, next) => {
  try {
    const Workout = require('../models/Workout');

    const workouts = await Workout.find({ user: req.user.id });

    if (!workouts || workouts.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please add workouts first',
      });
    }

    const totalWorkouts = workouts.length;

    const totalDuration = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0
    );

    const totalCaloriesBurned = workouts.reduce(
      (sum, workout) => sum + workout.caloriesBurned,
      0
    );

    const averageDuration = Math.round(
      totalDuration / totalWorkouts
    );

    const insight =
      await geminiService.generateFitnessInsights(
        totalWorkouts,
        averageDuration,
        totalCaloriesBurned
      );

    res.status(200).json({
      totalWorkouts,
      averageDuration,
      totalCaloriesBurned,
      insight,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWorkoutRecommendation,
  getFitnessInsights,
};