import React, { useState, useContext } from 'react';
import CounterInput from 'components/shared/CounterInput';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import styles from './ShoppingCartControl.module.scss';

const ShoppingCartControl = ({ jersey,  cartItemIndex }) => {
  const [counter, setCountNum] = useState();
  const {
    actions: { updateCounter, removeFromCart }
  } = useContext(ShoppingCartContext);

  const setCounter = (num) => {
    setCountNum(num);
    updateCounter(cartItemIndex, num);
  }

  const removeItem = () => {
    removeFromCart(cartItemIndex);
  }

  return (
    <div className={ styles.controlWrapper }>
      <CounterInput jerseyCount={ jersey.jerseyCount } setCounter={ setCounter } />
      <button onClick={ removeItem } className={ styles.removeButton }>Remove</button>
      <span>{ jersey.discount ? (counter * jersey.discount) : (counter * jersey.price) }€</span>
    </div>
  );
}

export default ShoppingCartControl;
