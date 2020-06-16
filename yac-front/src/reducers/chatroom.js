import * as actions from '../constants/actions';
import { messageIsNotDuplicate, setMessageProps } from '../utils';

const INITIAL_STATE = {
  messages: [],
  currentMessage: '',
  error: '',
  isFetching: false,
  currentUserUid: '',
  openChannel: 'general',
};

// TODO: Remove this fuctions to utils

const chatroomReducer = (state = INITIAL_STATE, { type, payload, data }) => {
  switch (type) {
    case actions.UPDATE_CHAT_SUCCESS: {
      const tempState = { ...state };
      const tempMessages = Object.assign([], state.messages);
      if (messageIsNotDuplicate(tempMessages, payload.messageId)) {
        tempMessages.push(
          setMessageProps({
            payload,
            data,
            currentUserUid: state.currentUserUid,
            lastMesage: tempMessages[tempMessages.length - 1],
          }),
        );
        const { length } = tempMessages;
        if (length > 2 && tempMessages[length - 2].userUid === tempMessages[length - 1].userUid) {
          tempMessages[length - 2].bulkMessage = true;
        }
      }
      tempState.messages = tempMessages;
      return tempState;
    }
    case actions.CURRENT_USER: {
      return {
        ...state,
        currentUserUid: data.userUid,
      };
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
