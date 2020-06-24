import React from 'react';
import visa from 'assets/images/visa.png';
import masterCard from 'assets/images/master-card.png';
import styles from './CardForm.module.scss';

const CardForm = () => {
  return (
    <div>
      <div className={ styles.imgWrapper }>
        <span className={ styles.title }>Pay with card</span>
        <img className={ styles.img } src={ visa } alt='' />
        <img className={ styles.img } src={ masterCard } alt='' />
      </div>
    </div>
  );
}

export default CardForm;
