import React, { useState } from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import { Colors } from 'lib/colors';
import styles from './Checkbox.module.scss';

const Checkbox = ({ label, flag, handleCheck, isActive, reviewIcon }) => {
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
      { reviewIcon && <FavoriteSharpIcon style={{ fill: Colors.reviewedRating }} fontSize='small' /> }
      { flag && <img className={ styles.flagImage } src={ flag } alt='' /> }
    </label>
  );
}

export default Checkbox;
