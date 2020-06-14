const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const formatChannel = (channel, userId) => {
  if (channel !== 'general') {
    return userId > channel
      ? `${channel}-${userId}`
      : `${userId}-${channel}`;
  }
  return channel;
};

function postMessage(request, response) {
  const { message, channel, userId } = request.body;
  const newChannel = formatChannel(channel, userId);
  const docRef = db.collection('chats').doc(newChannel);

  const result = docRef.set(message);
  console.log(result);
  response.send(result);
}

module.exports = {
  postMessage,
};
