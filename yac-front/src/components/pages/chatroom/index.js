import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, List } from '@material-ui/core';
import firebase from '../../../store/firebase';
import {
  Channels, Chat, Settings, ChatInput, HeaderChat,
} from '../../commons';
import Navigation from '../../commons/navigation';
import {
  UPDATE_CHAT, POST_MESSAGE, SAVE_MESSAGE, SIGN_OUT,
} from '../../../constants/actions';
import { LOGIN } from '../../../constants/routes';

function Chatroom({
  error, isFetching, messages, currentMessage,
  loader, sendIcon, postMessage, saveMessage,
  openChannel, userUid, username,
  signOut, history, user, updateChatState,
}) {
  useEffect(() => {
    if (!user.email && !firebase.auth().currentUser) {
      history.push(LOGIN);
    }
  }, [history, user]);
  useEffect(() => {
    const dbh = firebase.firestore();
    dbh.collection(`chats/${openChannel}/messages`)// .where(userUid, '!=', userUid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            updateChatState({
              meesageId: change.doc.id,
              snapshot: change.doc.data(),
              userUid,
            });
            doScrollDown();
          }
          if (change.type === 'modified') {
            console.log('Modified messages: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed messages: ', change.doc.data());
          }
        });
      });
  }, [userUid]);
  function updateStateOnChange(e) {
    if (!e.target.value || e.target.value.trim()) {
      saveMessage(e.target.value);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  function sendMessage() {
    if (currentMessage) {
      postMessage({
        currentMessage, openChannel, userUid, username,
      });
      saveMessage('');
    }
  }

  function doScrollDown() {
    const objDiv = document.getElementById('listChat');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  return (
    <div id="page-top">
      <Navigation title="Chatroom" signOut={signOut} user={user} />
      <div className="container">
        {error && <div className="error">Oops! Something went wrong!</div>}
        {isFetching && (
          <div className="centered-container">
            <img src={loader} alt="Loading messages" />
          </div>
        )}
        <div className="row">
          <Settings />
          <Channels openChannel={openChannel} lastMessage={messages[messages.length - 1]} />
          <section className="chat" id="chat">
            <HeaderChat openChannel={openChannel} />
            <Paper
              elevation={0}
              id="listChat"
              style={{ maxHeight: '75%', overflow: 'auto' }}
            >
              <List
                name="listName"
                id="listChatMessages"
              >
                <Chat messages={messages} doScrollDown={doScrollDown} />
              </List>
            </Paper>
            <ChatInput
              value={currentMessage}
              changeHandler={updateStateOnChange}
              clickHandler={sendMessage}
              enterKeyHandler={handleKeyPress}
              icon={sendIcon}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.chatroomState.error,
  isFetching: state.chatroomState.isFetching,
  messages: state.chatroomState.messages,
  currentMessage: state.chatroomState.currentMessage,
  openChannel: state.chatroomState.openChannel,
  user: state.userState.user,
  userUid: state.userState.user.userUid,
  username: state.userState.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  updateChatState: (data) => dispatch({ type: UPDATE_CHAT, data }),
  saveMessage: (message) => dispatch({ type: SAVE_MESSAGE, payload: { message } }),
  postMessage: (data) => dispatch({ type: POST_MESSAGE, data }),
  signOut: () => dispatch({ type: SIGN_OUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
