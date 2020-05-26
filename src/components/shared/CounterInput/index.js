import React, { useState, useEffect, useContext } from 'react';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Input from 'components/shared/Input';
import styles from './CounterInput.module.scss';

const CounterInput = ({ setCounter, jerseyCount }) => {
  const [count, setCountState] = useState(jerseyCount ? jerseyCount : 1);
  const {
    actions: { updateCounter }
  } = useContext(ShoppingCartContext);

  const changeCount = (type) => {
    if (type === 'decrease') {
      setCountState(count => count - 1);

      if (count < 2) {
        setCountState(1);
        setCounter(1);
      }
    }

    if (type === 'increase') {
      setCountState(count => count + 1);

      if (count > 9) {
        setCountState(10);
        setCounter(10);
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
        className={ styles.input }
        onChangeHandler={ () => {} }
      />
      <button className={ styles.quantityButton } onClick={ () => changeCount('increase') }>+</button>
    </div>
  );
}

export default CounterInput;
