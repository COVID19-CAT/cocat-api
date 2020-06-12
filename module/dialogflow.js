const dialogflow = require('dialogflow');
const uuid = require('uuid');

module.exports = class Df {
  constructor(
    projectId = 'covid19-amqyme',
    keyFile = '../config/neon-camera-280107-6c7c96d29505.json'
  ) {
    this.projectId = projectId;
    this.keyFile = keyFile;

    const privateKey = keyFile['private_key'];
    const clientKey = keyFile['client_email'];
    const config = {
      private_key: privateKey,
      client_email: clientKey,
    };
  }



}