module.exports = {
  async detectTextIntent(
    projectId = 'covid19cat',
    sessionId = '123456',
    query,
    languageCode = 'ko') {

    const dialogflow = require('dialogflow');

    const sessionClient = new dialogflow.SessionsClient({ keyFilename: __dirname + '/dialogflowKey.json' });


    const sessionPath = sessionClient.sessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };


    const responses = await sessionClient.detectIntent(request);

    return responses[0];
  }
}
