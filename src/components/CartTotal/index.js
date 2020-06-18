import React from 'react';
import styles from './CartTotal.module.scss';

const CartTotal = ({ cartInfo, applied }) => {
  return (
    <div className={ styles.item }>
      <span className={ styles.gradTotal }>Grand total:</span>
       <span className={ styles.gradTotal }>{ applied ? (cartInfo.total - (cartInfo.total * 0.1)) : cartInfo.total }€</span>
    </div>
  );
}

export default CartTotal;
