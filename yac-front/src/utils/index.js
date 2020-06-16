export const formatTime = (time) => `${new Date(time).getHours()}h${new Date(time).getMinutes()}`;

export const filterMsg = (msg, msgId) => msg.filter((item) => item.messageId === msgId);

export const messageIsNotDuplicate = (msg, msgId) => filterMsg(msg, msgId).length <= 0;

export const generateUsername = (USERNAME_CHAR_LIMIT, userName) => {
  const newUsername = userName.slice(0, USERNAME_CHAR_LIMIT);
  if (userName.length > USERNAME_CHAR_LIMIT) return newUsername.trim().concat('...');
  return newUsername;
};

export const setMessageProps = ({ payload, currentUserUid }) => {
  const { userUid } = payload;
  const fromYou = userUid === currentUserUid;
  return {
    body: payload.body,
    messageId: payload.messageId,
    time: payload.time,
    username: payload.username,
    youtube: payload.youtube,
    userUid,
    fromYou,
  };
};
