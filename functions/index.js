const admin = require('firebase-admin');
const functions = require('firebase-functions');
const search = require('youtube-search');
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

const YOUTUBE_KEY = 'AIzaSyC12_RX8SCxYk5hq2nBafLP2oCjrFu3yks';
const config = {
  maxResults: 2,
  key: YOUTUBE_KEY,
};

const saveMessage = async (request, response, youtube = '') => {
  try {
    const {
      message, channel, username, userId,
    } = request.body;
    const newChannel = formatChannel(channel, userId);
    const time = new Date().getTime();
    const messageId = `${time}-${username}-${userId}`;
    const collecRef = db.collection(`chats/${newChannel}/messages`);
    const docRef = collecRef.doc(messageId);
    const result = await docRef.set({
      body: message,
      messageId,
      time,
      userId,
      username,
      youtube,
    });
    respondWithResult(response, 200)(result);
  } catch (error) {
    console.log(error);
    respondWithError(response, 200)(errorCodes.FIREBASE);
  }
};

exports.message = functions.https.onRequest(async (request, response) => {
  const {
    message,
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
  } else if (message.startsWith('/youtube')) {
    const query = message.trim().replace('/youtube', ' ');
    if (!query) respondWithError(response, 200)(errorCodes.NO_QUERY);

    await search(query, config, (err, results) => {
      if (err) {
        console.log(err);
        respondWithError(response, 200)(errorCodes.PROBLEM_YOUTUBE);
      }
      if (!results || results.length === 0) {
        respondWithError(response, 200)(errorCodes.NO_RESULTS);
      }
      let index = 0;
      let video = results[index];
      if (video.kind === 'youtube#channel') {
        index += 1;
        video = results[index];
      }
      console.log(video);
      saveMessage(request, response, video.id);
    });
  } else {
    saveMessage(request, response);
  }
});
