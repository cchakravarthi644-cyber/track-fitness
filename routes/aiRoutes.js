const express = require('express');

const aiController = require('../controllers/aiController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post(
  '/workout-recommendation',
  aiController.getWorkoutRecommendation
);

router.post(
  '/fitness-insights',
  aiController.getFitnessInsights
);

module.exports = router;