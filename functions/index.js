const admin = require('firebase-admin');
const functions = require('firebase-functions');
const search = require('youtube-search');
const { respondWithResult, respondWithError } = require('./src/helpers/response');
const { errorCodes } = require('./src/helpers/constants');
const { formatChannel } = require('./src/utils');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://yac-meltstudio.firebaseio.com',
});

const db = admin.firestore();

const YOUTUBE_KEY = 'AIzaSyC12_RX8SCxYk5hq2nBafLP2oCjrFu3yks';
const DEFAULT_IMAGE = 'http://www.boutique-uns.com/uns/185-home_01grid/polo-femme.jpg';
const config = {
  maxResults: 2,
  key: YOUTUBE_KEY,
};

const saveMessage = async (request, response, youtube = '') => {
  try {
    const {
      message, channel, username, userUid, image = DEFAULT_IMAGE,
    } = request.body;
    const newChannel = formatChannel(channel, userUid);
    const time = new Date().getTime();
    const messageId = `${time}-${username}-${userUid}`;
    const collecRef = db.collection(`chats/${newChannel}/messages`);
    const docRef = collecRef.doc(messageId);
    const result = await docRef.set({
      body: message,
      messageId,
      time,
      userUid,
      username,
      youtube,
      image,
    });
    respondWithResult(response, 200)(result);
  } catch (error) {
    console.log(error);
    respondWithError(response, 200)(errorCodes.FIREBASE);
  }
};

exports.user = functions.https.onRequest(async (request, response) => {
  try {
    const {
      userUid, firstName, lastName, email, username, image = DEFAULT_IMAGE,
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
    } else if (userUid && !email) {
      const collecRef = db.collection('users');
      const docRef = collecRef.doc(userUid);
      const result = await docRef.get();
      if (result.exists) {
        respondWithResult(response, 200)(result.data());
      } else {
        respondWithError(response, 205)(errorCodes.NO_REGISTER_USER);
      }
    } else if (firstName && lastName && email) {
      const time = new Date().getTime();
      const collecRef = db.collection('users');
      const docRef = collecRef.doc(userUid);
      const result = await docRef.set({
        userUid, firstName, lastName, email, username, lastLogin: time, image,
      });
      respondWithResult(response, 200)(result);
    } else {
      respondWithError(response, 200)(errorCodes.INVALID_REQUEST);
    }
  } catch (error) {
    console.log(error);
    respondWithError(response, 200)(errorCodes.FIREBASE);
  }
});

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
      saveMessage(request, response, video.id);
    });
  } else {
    saveMessage(request, response);
  }
});
