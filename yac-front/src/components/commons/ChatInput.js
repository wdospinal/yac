import React from 'react';

const styles = {
  chatInputWrapper: {
    display: 'flex',
  },
  chatInput: {
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid $border-color',
    width: '100%',
    padding: '1.2em 1.7em',
    boxShadow: '11px 7px 15px -1px rgba(170,170,170,0.5)',
    borderRadius: '5px',
    fontSize: '15px',
    backgroundColor: '$primary-color',
    fontFamily: '$primary-font',
    color: '$grey',
  },
  input_focus: {
    outline: 'none',
  },
  chatIcon: {
    height: '25px',
    width: '25px',
    position: 'absolute',
    cursor: 'pointer',
    top: '13px',
    right: '13px',
    zIndex: '1',
  },
};

const ChatInput = ({
  value, changeHandler, enterKeyHandler, clickHandler, icon,
}) => (
  <div className={styles.chatInputWrapper}>
    <input
      id="chatInput"
      type="text"
      className={styles.chatInput}
      value={value}
      onChange={changeHandler}
      onKeyPress={enterKeyHandler}
      placeholder="Enter message"
      autoComplete="off"
    />
    <div
      role="button"
      onClick={clickHandler}
      onKeyPress={enterKeyHandler}
      tabIndex={0}
    >
      <img
        className={styles.chatIcon}
        src={icon}
        alt="send icon"
      />
    </div>
  </div>
);

export default ChatInput;
