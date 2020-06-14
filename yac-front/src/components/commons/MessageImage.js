import React from 'react';
import IMAGE_DEFAULT from '../../assets/woman.jpeg';

const USERNAME_CHAR_LIMIT = 9;
const styles = {
  wrapper: (isMini) => ({
    alignItems: 'center',
    marginRight: 5,
    marginLeft: isMini ? 0 : 5,
  }),
  linearGradient: (color) => ({
    width: '8vh',
    height: '8vh',
    borderRadius: '4vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: color,
  }),
  circleWrapper: {
    width: '7vh',
    height: '7vh',
    position: 'relative',
    padding: '7% 0px 0px 7%',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  divWrapper: {
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: 'white',
    borderWidth: 2.5,
    position: 'absolute',
    left: '75%',
  },
  userName: {
    fontSize: 12,
    marginTop: 5,
  },
};

const generateUsername = (userName) => {
  const newUsername = userName.slice(0, USERNAME_CHAR_LIMIT);

  if (userName.length > USERNAME_CHAR_LIMIT) return newUsername.trim().concat('...');

  return newUsername;
};
// TODO: diferent gradient per user
// const getGradient = (type = 1) => {
//   switch (type) {
//     case 1:
//       return ['#8E01C8', '#C402B2', '#EA013F'];
//     case 2:
//       return ['#72D83F', '#61Ca20'];
//     case 3:
//       return ['#9E0089', '#CD0E66', '#E53D35', '#F77A21', '#FAAA49'];
//     default:
//       return ['#9E0089', '#CD0E66', '#E53D35', '#F77A21', '#FAAA49'];
//   }
// };

const MessageImage = ({
  image = IMAGE_DEFAULT,
  username = 'wdospinal',
  isMini = false,
}) => (
  <div>
    <div style={styles.wrapper(isMini)}>
      <div style={styles.linearGradient('linear-gradient(to right, #4880EC, #019CAD)')}>
        <div style={styles.circleWrapper}>
          <img
            style={styles.photo}
            src={image}
            alt={username}
          />
        </div>
      </div>
      <div style={styles.userName}>{generateUsername(username)}</div>
    </div>
  </div>
);

export default MessageImage;
