import React from 'react';
import Message from './Message';

const chats = [
  {
    title: 'Image',
    author: 'author',
  },
  {
    title: 'Image',
    author: 'author',
  }, {
    title: 'Image',
    author: 'author',
  }, {
    title: 'Image',
    author: 'author',
  }];

export default function Chat({ messages = chats }) {
  return (
    <div className="messages-chat">
      {messages && messages.map((message) => (
        <Message key={message.messageId} message={message} />
      ))}
    </div>
  );
}
