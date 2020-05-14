import React, { useContext, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import CheckBox from 'components/shared/CheckBox';
import styles from './FilterSection.module.scss';

const CheckBoxCountries = () => {
  const countries = useContext(CountriesContext);
  const [height, setHeight] = useState(0);

  const handleCountriesCheck = (checked, index) => {
    console.log('checked', checked, index);
  }

  const toggle = () => {
    setHeight(height === 0 ? 'auto' : 0);
  }

  return (
    <div>
      <button className={ styles.button } onClick={ toggle }>
        <div className={ styles.buttonWrapper }>
          <span className={ styles.selectLabel }>Select country:</span>
          { height === 0 ? <AddIcon /> : <RemoveIcon /> }
        </div>
      </button>
      <AnimateHeight
        duration={ 500 }
        height={ height }
        className={ styles.accordion }
      >
        { countries ? countries.map((country, index) => (
            <CheckBox
              key={ country.name }
              label={ country.name }
              flag={ country.flag }
              handleCheck={ (checked) => handleCountriesCheck(index, checked) }
            />
          )) : ''
        }
      </AnimateHeight>
    </div>
  )
}

export default CheckBoxCountries;
