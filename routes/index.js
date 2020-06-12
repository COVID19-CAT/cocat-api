const express = require('express');
const router = express.Router();

const config = require('../config');

/* GET home page. */
router.post('/cheese', async (req, res, next) => {
  const { query } = req.body;

  const bot = require('../module/dialogflow');

  const projectId = config.projectId;
  const sessionId = config.sessionId;
  const languageCode = config.languageCode;

  try {
    const response = await bot.detectTextIntent(projectId, sessionId, query, languageCode);
    const intent = response.queryResult.intent.displayName;
    switch (intent) {
      case 'welcome':
        res.status(200).json({ re: response.queryResult.fulfillmentText });
    }
    res.status(200).json(response);

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
