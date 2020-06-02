import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartControls from 'components/ShoppingCartControls';
import CartAccountInfo from 'components/CartAccountInfo';
import Clickable from 'components/shared/Clickable';
import styles from './ShoppingCartList.module.scss';

const ShoppingCartList = ({ cartInfo, closeModal }) => {
  const closeModalHandler = () => {
    closeModal();
  }

  const isUser = false;

  return (
    <div className={ styles.shoppingCartListWrapper }>
      <ShoppingCartControls cartInfo={ cartInfo } />
      <div className={ styles.priceWrapper }>
        <span>Subtotal:</span>
        <span>{ cartInfo.total }€</span>
      </div>
      <Clickable
        tag={ Link }
        onClick={ closeModalHandler }
        className={ styles.link }
        to='/cart'
        transparent
      >
        VIEW FULL SHOPPING BAG
      </Clickable>
      { !isUser && <CartAccountInfo closeModal={ closeModalHandler } /> }
      <Clickable
        tag={ Link }
        className={ styles.checkoutLink }
        to='/checkout'
        disabled={ !isUser }
      >
        Checkout
      </Clickable>
    </div>
  );
}

export default ShoppingCartList;
