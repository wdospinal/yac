import React from 'react';
import Youtube from 'react-youtube';
import MessageImage from './MessageImage';
import { generateUsername, formatTime } from '../../utils';

const USERNAME_CHAR_LIMIT = 9;
const styles = {
  container: {
    flex: 1,
    backgroudColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    height: '10vh',
    marginTop: '2vh',
  },
  channelList: {
    flex: 1,
  },
  chat: {
    flex: 5,
  },
  settings: {
    flex: 1,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
  },
  userName: {
    fontSize: 12,
    marginTop: 5,
  },
  time: {
    fontSize: '10px',
    color: 'lightgrey',
    marginBottom: '10px',
    marginLeft: '85px',
  },
};

const Message = ({
  message: {
    body, time, username, fromYou, youtube, bulkMessage,
  },
  doScrollDown,
}) => (
  <div>
    {!fromYou
      ? (
        <div>
          <div className="message">
            <MessageImage username={username} />
            <p className="text">{body}</p>
          </div>
          {youtube
          && (
          <Youtube
            onReady={doScrollDown}
            videoId={youtube}
            opts={{ width: 400, height: 250 }}
          />
          ) }
          <div style={styles.row}>
            <div style={styles.userName}>{generateUsername(USERNAME_CHAR_LIMIT, username)}</div>
            {!bulkMessage && <p className="time">{formatTime(time)}</p>}
          </div>
        </div>
      )
      : (
        <div>
          <div className="message text-only">
            <div className="response">
              <p className="text">{body}</p>
            </div>
          </div>
          {youtube
          && (
          <Youtube
            onReady={doScrollDown}
            videoId={youtube}
            opts={{ width: 400, height: 250 }}
          />
          ) }
          {!bulkMessage && <p className="time-self">{formatTime(time)}</p>}
        </div>
      )}
  </div>
);
export default Message;
