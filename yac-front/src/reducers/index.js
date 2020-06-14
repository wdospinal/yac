import { combineReducers } from 'redux';
import userReducer from './user';
import chatroomReducer from './chatroom';

const rootReducer = combineReducers({
  userState: userReducer,
  chatroomState: chatroomReducer,
});

export default rootReducer;
