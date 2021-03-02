import React from 'react';
import PropTypes from 'prop-types';

import { flagCardShirt } from '../../assets/img/flags/flags';
import { countryCardShirt } from '../../assets/img/countries/countries';
import styles from './styles.module.css';

function CardsShirtPopup({ name, onChange, value }) {
  return (
    <div className={styles.popupContainer}>
      <h4>{name}</h4>
      <label>
        <input
          type='radio'
          name={name}
          value={flagCardShirt}
          onChange={onChange}
          checked={value === flagCardShirt}
        />
        <div className={styles.cardShirt}>
          <img src={flagCardShirt} alt='flags' />
        </div>
      </label>
      <label>
        <input
          type='radio'
          name={name}
          value={countryCardShirt}
          onChange={onChange}
          checked={value === countryCardShirt}
        />
        <div className={styles.cardShirt}>
          <img src={countryCardShirt} alt='tech' />
        </div>
      </label>
    </div>
  );
}

CardsShirtPopup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(CardsShirtPopup);
