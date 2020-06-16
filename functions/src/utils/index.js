const formatChannel = (channel, userUid) => {
  if (channel !== 'general') {
    return userUid > channel
      ? `${channel}-${userUid}`
      : `${userUid}-${channel}`;
  }
  return channel;
};

module.exports = {
  formatChannel,
};
