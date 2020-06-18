import React from 'react';
import styles from './CheckoutProgress.module.scss';

const CheckoutProgress = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.item }>
        <span className={ styles.circle }>1</span>
        <span>Review your order</span>
      </div>
      <div className={ styles.item }>
        <span className={ styles.circle }>2</span>
        <span>Delivery address</span>
      </div>
      <div className={ styles.item }>
        <span className={ styles.circleLast }>3</span>
        <span>Select payment method</span>
      </div>
    </div>
  );
}

export default CheckoutProgress;