import React from 'react';
import Message from './Message';

const Chat = ({ messages, doScrollDown }) => (
  <div className="messages-chat">
    {messages && messages.map((message) => (
      <Message key={message.messageId} message={message} doScrollDown={doScrollDown} />
    ))}
  </div>
);

export default Chat;
