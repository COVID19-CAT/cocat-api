module.exports = {

  async detectTextIntent(
    projectId = 'covid19cat',
    sessionId = '123456',
    query = '안녕',
    languageCode = 'ko') {

    const dialogflow = require('dialogflow');

    const sessionClient = new dialogflow.SessionsClient();


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
    console.log(responses);

    console.log(responses[0]);

    return responses[0];
  }
}
