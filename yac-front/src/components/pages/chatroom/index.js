import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Element, scroller } from 'react-scroll';
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
  openChannel, userId, username, scrollDown,
  signOut, history, user, updateChatState,
}) {
  useEffect(() => {
    if (!user.email && !firebase.auth().currentUser) {
      history.push(LOGIN);
    }
  }, [history, user]);
  useEffect(() => {
    const dbh = firebase.firestore();
    dbh.collection(`chats/${openChannel}/messages`)// .where(userId, '!=', userId)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            updateChatState({
              meesageId: change.doc.id,
              snapshot: change.doc.data(),
              userId,
            });
          }
          if (change.type === 'modified') {
            console.log('Modified messages: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed messages: ', change.doc.data());
          }
        });
      });
  }, []);
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
        currentMessage, openChannel, userId, username,
      });
      saveMessage('');
    }
  }
  if (scrollDown) {
    scroller.scrollTo('finalElement', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'containerElement',
    });
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
          <Channels />
          <section className="chat">
            <HeaderChat openChannel={openChannel} />
            <Element
              name="chat"
              className="element"
              id="containerElement"
              style={{
                position: 'relative',
                height: '75%',
                overflow: 'scroll',
              }}
            >
              <Chat messages={messages} />
              <Element
                name="finalElement"
                id="finalElement"
              />
            </Element>
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
  scrollDown: state.chatroomState.scrollDown,
  userId: state.userState.user.userId,
  user: state.userState.user,
  username: state.userState.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  updateChatState: (data) => dispatch({ type: UPDATE_CHAT, data }),
  saveMessage: (message) => dispatch({ type: SAVE_MESSAGE, payload: { message } }),
  postMessage: (data) => dispatch({ type: POST_MESSAGE, data }),
  signOut: () => dispatch({ type: SIGN_OUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
