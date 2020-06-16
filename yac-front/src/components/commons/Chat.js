import React from 'react';
import Message from './Message';

export default function Chat({ messages, doScrollDown }) {
  return (
    <div className="messages-chat">
      {messages && messages.map((message) => (
        <Message key={message.messageId} message={message} doScrollDown={doScrollDown} />
      ))}
    </div>
  );
}
