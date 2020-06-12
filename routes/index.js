const express = require('express');
const router = express.Router();

const config = require('../config');
const { statusCode, authUtil, responseMessage } = require('../module/util');

router.post('/cheese', async (req, res, next) => {
  const { query } = req.body;

  const bot = require('../module/bot/dialogflow');

  const projectId = config.projectId;
  const sessionId = config.sessionId;
  const languageCode = config.languageCode;

  try {
    const response = await bot.detectTextIntent(projectId, sessionId, query, languageCode);
    const intent = response.queryResult.intent.displayName;

    let result;
    switch (intent) {
      case 'welcome': result = response.queryResult.fulfillmentText;
        break;

      case 'find-place': result = 'temp';
        break;

      default: result = {};
        break;
    }
    res
      .status(statusCode.OK)
      .json(authUtil.successTrue(responseMessage.OK, result));

  } catch (e) {
    console.error(e);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;