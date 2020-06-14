const admin = require('firebase-admin');
const { respondWithResult, respondWithError } = require('../helpers/response');
const { errorCodes } = require('../helpers/constants');
const serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://yac-meltstudio.firebaseio.com',
});

const db = admin.firestore();

const formatChannel = (channel, userId) => {
  if (channel !== 'general') {
    return userId > channel
      ? `${channel}-${userId}`
      : `${userId}-${channel}`;
  }
  return channel;
};

async function postMessage(request, response) {
  const {
    message, channel, username, userId,
  } = request.body;
  response.set('access-control-allow-origin', '*');
  console.log(request.method);
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'content-type');
    response.set('Access-Control-Max-Age', '3600');
    console.log('entra');
    respondWithResult(response, 204)('');
  } else {
    const newChannel = formatChannel(channel, userId);
    const time = new Date().getTime();
    const messageId = `${time}-${username}-${userId}`;
    const collecRef = db.collection(`chats/${newChannel}/messages`);
    const docRef = collecRef.doc(messageId);
    try {
      const result = await docRef.set({
        body: message,
        messageId,
        time,
        userId,
        username,
      });
      respondWithResult(response, 200)(result);
    } catch (error) {
      console.log(error);
      respondWithError(response, 200)(errorCodes.FIREBASE);
    }
  }
}

module.exports = {
  postMessage,
};
