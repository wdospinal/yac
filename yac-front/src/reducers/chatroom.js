import * as actions from '../constants/actions';

const INITIAL_STATE = {
  messages: [],
  currentMessage: '',
  error: '',
  isFetching: false,
  userId: '01', // TODO: delete when login
  reciever: 'general',
  openChannel: 'general',
};

const filterMsg = (msg, msgId) => msg.filter((item) => item.messageId === msgId);
const messageIsNotDuplicate = (msg, msgId) => filterMsg(msg, msgId).length <= 0;

const setMessageProps = ({ payload, data }) => {
  const { userId } = payload;
  const { userId: currentUserId } = data;
  const fromYou = userId === currentUserId;
  return {
    body: payload.body,
    messageId: payload.messageId,
    time: payload.time,
    username: payload.username,
    youtube: payload.youtube,
    userId,
    fromYou,
  };
};

const chatroomReducer = (state = INITIAL_STATE, { type, payload, data }) => {
  switch (type) {
    case actions.UPDATE_CHAT_SUCCESS: {
      const tempState = { ...state };
      const tempMessages = Object.assign([], state.messages);
      console.log(payload);
      console.log(payload.messageId);
      if (messageIsNotDuplicate(tempMessages, payload.messageId)) {
        tempMessages.push(
          setMessageProps({
            payload,
            data,
          }),
        );
      }
      tempState.messages = tempMessages;
      return tempState;
    }
    case actions.SAVE_MESSAGE:
      return {
        ...state,
        currentMessage: payload.message,
      };

    default:
      return state;
  }
};

export default chatroomReducer;
