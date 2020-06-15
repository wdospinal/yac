import React from 'react';

const HeaderChat = ({ openChannel }) => (
  <div className="header-chat">
    <i className="icon fa fa-user-o" aria-hidden="true" />
    <p className="name">{openChannel}</p>
    <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true" />
  </div>
);
export default HeaderChat;
