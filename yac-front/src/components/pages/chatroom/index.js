import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element, scroller } from 'react-scroll';
import firebase from '../../../store/firebase';
import {
  Channels, Chat, Settings, ChatInput, HeaderChat,
} from '../../commons';
import Navigation from '../../commons/navigation';
import {
  UPDATE_CHAT, POST_MESSAGE, SAVE_MESSAGE,
} from '../../../constants/actions';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.chatStyle = {
      height: props.height,
      width: props.width,
    };
    this.customStyle = {
      backgroundColor: props.themeColor,
      borderColor: `${props.themeColor} ${
        props.themeColor
      } transparent transparent`,
      color: props.textColor,
    };
  }

  async componentDidMount() {
    const {
      userId, updateChatState, openChannel,
    } = this.props;
    const dbh = firebase.firestore();
    this.listener = dbh.collection(`chats/${openChannel}/messages`)// .where(userId, '!=', userId)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('New messages: ', change.doc.data());
            updateChatState({
              meesageId: change.doc.id,
              snapshot: change.doc.data(),
              userId,
            });
            scroller.scrollTo('finalElement', {
              duration: 800,
              delay: 0,
              smooth: 'easeInOutQuart',
              containerId: 'containerElement',
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
  }

  componentWillUnmount() {
    // this.listener.off();
  }

  render() {
    const {
      error,
      isFetching,
      messages,
      currentMessage,
      loader,
      sendIcon,
      postMessage,
      saveMessage,
      openChannel,
      userId,
      username,
    } = this.props;

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
      console.log(username);
      if (currentMessage) {
        postMessage({
          currentMessage, openChannel, userId, username,
        });
        saveMessage('');
      }
    }

    return (
      <div id="page-top">
        <Navigation title="Chatroom" />
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
}

const mapStateToProps = (state) => ({
  error: state.chatroomState.error,
  isFetching: state.chatroomState.isFetching,
  messages: state.chatroomState.messages,
  currentMessage: state.chatroomState.currentMessage,
  openChannel: state.chatroomState.openChannel,
  userId: state.userState.user.userId, // TODO: login
  username: state.userState.user.username, // TODO: login
});

const mapDispatchToProps = (dispatch) => ({
  updateChatState: (data) => dispatch({ type: UPDATE_CHAT, data }),
  saveMessage: (message) => dispatch({ type: SAVE_MESSAGE, payload: { message } }),
  postMessage: (data) => dispatch({ type: POST_MESSAGE, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
