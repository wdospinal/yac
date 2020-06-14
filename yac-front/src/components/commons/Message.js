import React from 'react';
import { Container } from '@material-ui/core';
import MessageImage from './MessageImage';

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
};

const Message = ({ message: { body, time, username } }) => (
  <Container fixed style={styles.container}>
    <div style={styles.channelList}><MessageImage username={username} /></div>
    <div style={styles.chat}>{body}</div>
    <div style={styles.settings}>{new Date(time).toDateString()}</div>
  </Container>
);

export default Message;
