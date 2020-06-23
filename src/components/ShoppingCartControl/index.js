import React, { useContext } from 'react';
import CounterInput from 'components/shared/CounterInput';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Clickable from 'components/shared/Clickable';
import styles from './ShoppingCartControl.module.scss';

const ShoppingCartControl = ({ jersey,  cartItemIndex }) => {
  const {
    actions: { updateCounter, removeFromCart }
  } = useContext(ShoppingCartContext);

  const setCounter = (num) => {
    updateCounter(cartItemIndex, num);
  };

  const removeItem = () => {
    removeFromCart(cartItemIndex);
  }

  return (
    <div className={ styles.controlWrapper }>
      <CounterInput jerseyCount={ jersey.jerseyCount } setCounter={ setCounter } />
      <Clickable
        onClick={ removeItem }
        className={ styles.removeButton }
        transparent
      >
        Remove
      </Clickable>
      <span>{ jersey.discount ? (jersey.jerseyCount * jersey.discount) : (jersey.jerseyCount * jersey.price) }€</span>
    </div>
  );
}

export default ShoppingCartControl;
