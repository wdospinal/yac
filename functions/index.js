const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { respondWithResult, respondWithError } = require('./src/helpers/response');
const { errorCodes } = require('./src/helpers/constants');
const serviceAccount = require('./service-account.json');

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

// exports.signup = functions.https.onRequest(signup);
exports.message = functions.https.onRequest(async (request, response) => {
  const {
    message, channel, username, userId,
  } = request.body;
  console.log(request.body);
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true');
  console.log(request.method);
  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.sendStatus(204);
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
});
