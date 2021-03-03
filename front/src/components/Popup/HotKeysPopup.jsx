import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function HotKeysPopup({ name }) {
  return (
    <div className={styles.popupContainer}>
      <h4>{name}</h4>
      <ol>
        <li>Q - full screen game</li>
        <li>A - turn off the game melody</li>
        <li>Z - turn off game sounds</li>
        <li>SPACE - change the game melody</li>
        <li>ENTER - restart the game</li>
        <li>ESC - close full screen game</li>
      </ol>
    </div>
  );
}

HotKeysPopup.propTypes = {
  name: PropTypes.string.isRequired,
};

export default React.memo(HotKeysPopup);
