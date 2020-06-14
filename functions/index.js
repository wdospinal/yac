const functions = require('firebase-functions');
const { postMessage } = require('./src/controllers/message');

// exports.signup = functions.https.onRequest(signup);
exports.message = functions.https.onRequest(postMessage);
