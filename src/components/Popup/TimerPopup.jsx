import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function TimerPopup({ name, onChange, value }) {
  return (
    <div className={styles.popupContainer}>
      <h4>{name}</h4>
      <label>
        <input
          type="radio"
          name={name}
          value={'60'}
          onChange={onChange}
          checked={value === '60'}
        />
        no timer
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value={'1'}
          onChange={onChange}
          checked={value === '1'}
        />
        1 min
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value={'2'}
          onChange={onChange}
          checked={value === '2'}
        />
        2 min
      </label>
    </div>
  );
}

TimerPopup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(TimerPopup);