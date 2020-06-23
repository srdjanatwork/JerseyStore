import React from 'react';
import styles from './CartTotal.module.scss';

const CartTotal = ({ cartInfo, applied, label }) => {
  return (
    <div className={ styles.item }>
      <span className={ styles.gradTotal }>{ label }</span>
       <span className={ styles.gradTotal }>{ applied ? (cartInfo.total - (cartInfo.total * 0.1)) : cartInfo.total }€</span>
    </div>
  );
}

export default CartTotal;
