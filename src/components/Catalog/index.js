import React, { useContext } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { TeamsContext } from 'utils/context/TeamsContextProvider';

import TeamSlider from 'components/TeamSlider'


import styles from './Catalog.module.scss';

const Catalog = () => {
  const data = useContext(TeamsContext);
  const [country, setCountry] = React.useState();
  const [countryData, setCountryData] = React.useState();
  const menuArr = [];

  let initialValue = '';
  let initialCountry = '';

  if (data) {
    initialValue = data[0].country;
    initialCountry = data[0];
  }

  for (let key in data) {
    menuArr.push(
      <MenuItem
        key={ data[key].country }
        value={data[key].country}
      >
       <span>{ data[key].country }</span>
       <img
         className={ styles.countryFlag }
         src={ data[key].countryImage }
         alt=''
        />
      </MenuItem>
    );
  }

  // choose country from select menu
  const handleCountry = (event) => {
    setCountry(event.target.value);

    const currentCountry = data.find(item => item.country === event.target.value);
    setCountryData(currentCountry);
  }

  console.log('---1', countryData);

  return (
    <div className={ styles.catalog }>
      <div className={ styles.selectWrapper }>
         <InputLabel
           id="demo-simple-select-label"
           className={ styles.label }
          >
            Select country:
          </InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           className={ styles.select }
           value={country || initialValue}
           onChange={handleCountry}
         >
           { menuArr }
         </Select>
      </div>
      <TeamSlider country={ countryData || initialCountry } />
    </div>
  );
}

export default Catalog;
