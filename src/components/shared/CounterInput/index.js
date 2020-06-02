import React, { useState, useEffect } from 'react';
import Input from 'components/shared/Input';
import styles from './CounterInput.module.scss';

const MIN_VALUE = 1;
const MAX_VALUE = 10;

const CounterInput = ({ setCounter, jerseyCount }) => {
  const [count, setCountState] = useState(jerseyCount ? jerseyCount : 1);

  const changeCount = (type) => {
    if (type === 'decrease') {
      setCountState(count => count - 1);

      if (count < (MIN_VALUE + 1)) {
        setCountState(MIN_VALUE);
        setCounter(MIN_VALUE);
      }
    }

    if (type === 'increase') {
      setCountState(count => count + 1);

      if (count > (MAX_VALUE - 1)) {
        setCountState(MAX_VALUE);
        setCounter(MAX_VALUE);
      }
   }
  }

  useEffect(() => {
    setCounter(count);
  }, [count])

  return (
     <div className={ styles.quantityWrapper }>
      <button className={ styles.quantityButton } onClick={ () => changeCount('decrease') }>-</button>
      <Input
        elementType='input'
        elementConfig={{
          'type': 'number',
          'min': '1',
          'max': '10'
        }}
        value={ count }
        className={ styles.counterInput }
        onChangeHandler={ () => {} }
      />
      <button className={ styles.quantityButton } onClick={ () => changeCount('increase') }>+</button>
    </div>
  );
}

export default CounterInput;
