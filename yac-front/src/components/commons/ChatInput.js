import React from 'react';
import { Send } from '@material-ui/icons';

const ChatInput = ({
  value, changeHandler, enterKeyHandler, clickHandler,
}) => (
  <div className="footer-chat">
    <input
      id="chatInput"
      type="text"
      className="write-message"
      value={value}
      onChange={changeHandler}
      onKeyPress={enterKeyHandler}
      placeholder="Type your message here"
      autoComplete="off"
    />
    <Send style={{ color: '#6780cc' }} onClick={clickHandler} />
  </div>
);

export default ChatInput;
