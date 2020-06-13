const express = require('express');
const router = express.Router();

const config = require('../config');
const search = require('../module/search');
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

    let result = [];

    const safeMessage = ['청정지역 지역이다옹~', '감염되지 않았다옹~ 안심하라옹!', '훗 겁쟁이다옹~ 걱정말라옹~'];
    const dangerMessage = ['위허하다옹! ', '조심하라옹! ', '확진자가 다녀갔다옹! '];
    switch (intent) {
      case 'welcome': result = response.queryResult.fulfillmentText;
        break;
      case 'creator': result = response.queryResult.fulfillmentText;
        break;

      case 'find-place':
        const spot = response.queryResult.parameters.fields.place.stringValue;
        result = await search.findPlaceBySpot(spot);
        if (result.length < 1) {
          result = safeMessage[getRandomInt(0, safeMessage.length - 1)];
        } else {
          let rm = `${result[0].month}월 ${result[0].day}일에 ${result[0].address_name} ${result[0].address}에 다녀갔다옹!!!`;
          result = dangerMessage[getRandomInt(0, dangerMessage.length - 1)] + rm;
        }
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

let lastInt = 0;
function getRandomInt(min, max) {
  while (true) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    if (lastInt === num) continue

    lastInt = num
    return num;
  }
}

module.exports = router;