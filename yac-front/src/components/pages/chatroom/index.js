import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { animateScroll as scroll, Element } from 'react-scroll';
import { Send } from '@material-ui/icons';
import firebase from '../../../store/firebase';
import {
  Channels, Chat, Settings, ChatInput,
} from '../../commons';
import Navigation from '../../commons/navigation';
import {
  UPDATE_CHAT, POST_MESSAGE, SAVE_MESSAGE,
} from '../../../constants/actions';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: '92vh',
  },
  channelList: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  chat: {
    display: 'flex',
    flex: 5,
    flexDirection: 'column',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
  },
  settings: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
};

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
            scroll.scrollToBottom('containerElement');
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
          <div className="row">
            <nav className="menu">
              <ul className="items">
                <li className="item">
                  <i className="fa fa-home" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-user" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-pencil" aria-hidden="true" />
                </li>
                <li className="item item-active">
                  <i className="fa fa-commenting" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-file" aria-hidden="true" />
                </li>
                <li className="item">
                  <i className="fa fa-cog" aria-hidden="true" />
                </li>
              </ul>
            </nav>

            <section className="discussions">
              <div className="discussion search">
                <div className="searchbar">
                  <i className="fa fa-search" aria-hidden="true" />
                  <input type="text" placeholder="Search..." />
                </div>
              </div>
              <div className="discussion message-active">
                <div className="photo" style={{ backgroundImage: 'url(https://image.noelshack.com/fichiers/2017/38/2/1505775062-1505606859-portrait-1961529-960-720.jpg)' }}>
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Megan Leib</p>
                  <span className="message" role="img" aria-label="emoji">9 pm at the bar if possible 😳</span>
                </div>
                <div className="timer">12 sec</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602)' }}>
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Dave Corlew</p>
                  <p className="message">Lets meet for a coffee or something today ?</p>
                </div>
                <div className="timer">3 min</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(https://tinyclipart.com/resource/man/man-5.jpg)' }} />
                <div className="desc-contact">
                  <p className="name">Jerome Seiber</p>
                  <p className="message">Ive sent you the annual report</p>
                </div>
                <div className="timer">42 min</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(http://thomasdaubenton.xyz/portfolio/images/photo.jpg)' }}>
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Thomas Dbtn</p>
                  <p className="message">See you tomorrow !</p>
                </div>
                <div className="timer">2 hour</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(http://www.boutique-uns.com/uns/185-home_01grid/polo-femme.jpg)' }} />
                <div className="desc-contact">
                  <p className="name">Elsie Amador</p>
                  <p className="message">What the f**k is going on ?</p>
                </div>
                <div className="timer">1 day</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(https://images.pexels.com/photos/979602/pexels-photo-979602.jpeg?auto=compress&cs=tinysrgb&h=350)' }} />
                <div className="desc-contact">
                  <p className="name">Billy Southard</p>
                  <p className="message">Ahahah</p>
                </div>
                <div className="timer">4 days</div>
              </div>

              <div className="discussion">
                <div className="photo" style={{ backgroundImage: 'url(http://static.jbcgroup.com/news/pictures/cc70ae498569ecc11eaeff09224d4ba5.jpg)' }}>
                  <div className="online" />
                </div>
                <div className="desc-contact">
                  <p className="name">Paul Walker</p>
                  <p className="message">You cant see me</p>
                </div>
                <div className="timer">1 week</div>
              </div>
            </section>

            <section className="chat">

              <div className="header-chat">
                <i className="icon fa fa-user-o" aria-hidden="true" />
                <p className="name">Megan Leib</p>
                <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true" />
              </div>

              <div className="messages-chat">
                <div className="message">
                  <div className="photo" style={{ backgroundImage: 'url(https://image.noelshack.com/fichiers/2017/38/2/1505775062-1505606859-portrait-1961529-960-720.jpg)' }}>
                    <div className="online" />
                  </div>
                  <p className="text"> Hi, how are you ? </p>
                </div>
                <div className="message text-only">
                  <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
                </div>
                <p className="time"> 14h58</p>
                <div className="message text-only">
                  <div className="response">
                    <p className="text"> Hey Megan ! Its been a while</p>
                  </div>
                </div>
                <div className="message text-only">
                  <div className="response">
                    <p className="text"> When can we meet ?</p>
                  </div>
                </div>
                <p className="response-time time"> 15h04</p>
                <div className="message">
                  <div className="photo" style={{ backgroundImage: 'url(https://image.noelshack.com/fichiers/2017/38/2/1505775062-1505606859-portrait-1961529-960-720.jpg)' }}>
                    <div className="online" />
                  </div>
                  <p className="text"> 9 pm at the bar if possible</p>
                </div>
                <p className="time"> 15h09</p>
              </div>

              <div className="footer-chat">
                <input type="text" className="write-message" placeholder="Type your message here" />
                <Send color="#515151" />
              </div>
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
