import React, { useState } from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({ label, flag, handleCheck, isActive }) => {
  const [isChecked, setCheked] = useState(false);

  const toggleCheckboxChange = label => {
    setCheked(!isChecked);
    handleCheck(!isChecked, label);
  }

  return (
    <label className={ styles.labelWrapper }>
      <input
        type="checkbox"
        value={label}
        checked={isActive}
        onChange={(label) => toggleCheckboxChange(label)}
     />
      <span className={ styles.label }>{label}</span>
      { flag && <img className={ styles.flagImage } src={ flag } alt='' /> }
    </label>
  );
}

export default Checkbox;
