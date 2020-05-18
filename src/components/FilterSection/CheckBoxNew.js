import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckBox from 'components/shared/CheckBox';
import styles from './FilterSection.module.scss';

const data = ['New', 'Not new'];

const initialCheckState = {
  0: false,
  1: false,
}

const CheckBoxNew = () => {
  const [checkedObj, setChecked] = useState(initialCheckState);
  const [height, setHeight] = useState(0);

  const toggle = () => {
    setHeight(height === 0 ? 'auto' : 0);
  }

  const handleCountriesCheck = (index) => {
    setChecked({
      ...initialCheckState,
      [index]: !checkedObj[index]
    });
  }

  return (
    <div>
      <button className={ styles.button } onClick={ toggle }>
        <div className={ styles.buttonWrapper }>
          <span className={ styles.selectLabel }>Select new:</span>
          { height === 0 ? <AddIcon /> : <RemoveIcon /> }
        </div>
      </button>
      <AnimateHeight
        duration={ 500 }
        height={ height }
        className={ styles.accordion }
      >
        { data ? data.map((item, index) => (
            <CheckBox
              key={ item }
              label={ item }
              handleCheck={ () => handleCountriesCheck(index) }
              isActive={ checkedObj[index] }
            />
          )) : ''
        }
      </AnimateHeight>
    </div>
  );
}

export default CheckBoxNew;
