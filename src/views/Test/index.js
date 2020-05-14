import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// import styles from './Test.module.scss';

const Test = () => {
  const [checked, setChecked] = React.useState(false);
  const [countries, setCountries] = useState([]);
  const [test, setTest] = useState([]);

  const handleChange = (event, cnt) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    fetch('/countries')
         .then(response => response.json())
         .then(data => setCountries(data));
  }, [])

  useEffect(() => {
    fetch('/teams?availability=false&countryId=1')
         .then(response => response.json())
         .then(data => setTest(data));
  }, [])

  return (
    <div>
      { countries.map(country => (
        <div>
          <span>{ country.name }</span>
          <Checkbox
            checked={checked}
            onChange={(country) => handleChange(country)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
      ))}
    </div>
  );
}

export default Test;
