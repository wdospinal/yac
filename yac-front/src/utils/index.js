export const formatTime = (time) => `${new Date(time).getHours()}h${new Date(time).getMinutes()}`;

export const generateUsername = (USERNAME_CHAR_LIMIT, userName) => {
  const newUsername = userName.slice(0, USERNAME_CHAR_LIMIT);
  if (userName.length > USERNAME_CHAR_LIMIT) return newUsername.trim().concat('...');
  return newUsername;
};
