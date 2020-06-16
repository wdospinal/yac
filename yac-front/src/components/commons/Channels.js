import React from 'react';
import { formatTime } from '../../utils';

const Channels = ({ openChannel, lastMessage }) => (
  <section className="discussions">
    <div className="discussion search">
      <div className="searchbar">
        <i className="fa fa-search" aria-hidden="true" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    {lastMessage
  && (
  <div className="discussion message-active">
    <div className="photo" style={{ backgroundImage: `url(${lastMessage.image})` }}>
      <div className="online" />
    </div>
    <div className="desc-contact">
      <p className="name">{openChannel}</p>
      <span className="message" role="img" aria-label="emoji">{lastMessage.body}</span>
    </div>
    <div className="timer">{formatTime(lastMessage.time)}</div>
  </div>
  )}
    {/* start discussion */}
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
    {/* end discussion */}
  </section>

);

export default Channels;
