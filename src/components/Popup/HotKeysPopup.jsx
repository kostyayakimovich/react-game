import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function HotKeysPopup({ name }) {
  return (
    <div className={styles.popupContainer}>
      <h4>{name}</h4>
      <ol>
        <li>SHIFT+Q - full screen game</li>
        <li>SHIFT+A - turn off the game melody</li>
        <li>SHIFT+Z - turn off game sounds</li>
        <li>SHIFT+SPACE - change the game melody</li>
        <li>ENTER - restart the game</li>
      </ol>
    </div>
  );
}

HotKeysPopup.propTypes = {
  name: PropTypes.string.isRequired,
};

export default React.memo(HotKeysPopup);