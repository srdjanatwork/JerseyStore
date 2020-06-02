import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Clickable from 'components/shared/Clickable';
import styles from './Test.module.scss';

const Test = () => {
  const [value, setValue] = useState(
    localStorage.getItem('myValueInLocalStorage') || ''
  );

  useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>

      <h1>Button disabled:</h1>
      <Clickable
        tag='button'
        label='button'
        onClick={ () => console.log('----') }
        disabled={ true }
      >Button</Clickable>

      <h1>Button enabled:</h1>
      <Clickable
        tag='button'
        label='button'
        onClick={ () => console.log('----') }
      >Button</Clickable>

      <h1>Button with class:</h1>
      <Clickable
        tag='button'
        label='button'
        onClick={ () => console.log('----') }
        className={ styles.test }
      >Button</Clickable>

      <h1>Link disabled</h1>
      <Clickable
        tag={ Link }
        label='link'
        to='/login'
        disabled={ true }
      >Link</Clickable>

      <h1>Link enabled:</h1>
      <Clickable
        tag={ Link }
        label='link'
        to='/login'
      >Link</Clickable>
    </div>
  );
}

export default Test;
