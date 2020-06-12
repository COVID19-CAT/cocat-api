const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', async (req, res, next) => {
  const { query, sessionId = 'session' } = req.body;
  const bot = require('../module/dialogflow');

  try {
    const response = await bot.detectTextIntent();
    res.json(response);

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
