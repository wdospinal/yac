import React from 'react';
import {
  Home, PersonAdd, Create, Comment, Description,
} from '@material-ui/icons';

const styles = {
  iconSize: {
    fontSize: 30,
  },
};

const Settings = () => (
  <nav className="menu">
    <ul className="items">
      <li className="item">
        <Home style={styles.iconSize} />
      </li>
      <li className="item">
        <PersonAdd style={styles.iconSize} />
      </li>
      <li className="item">
        <Create style={styles.iconSize} />
      </li>
      <li className="item item-active">
        <Comment style={styles.iconSize} />
      </li>
      <li className="item">
        <Description style={styles.iconSize} />
      </li>
    </ul>
  </nav>
);

export default Settings;
