import React from 'react';

const MessageImage = ({
  image = 'url(http://www.boutique-uns.com/uns/185-home_01grid/polo-femme.jpg)',
  isOnline = true,
}) => (
  <div className="photo" style={{ backgroundImage: image }}>
    {isOnline && <div className="online" />}
  </div>
);

export default MessageImage;
