import React from 'react';
import { useForm } from "react-hook-form";
import visa from 'assets/images/visa.png';
import masterCard from 'assets/images/master-card.png';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './CardForm.module.scss';

const CardForm = () => {
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  return (
    <div>
      <div className={ styles.imgWrapper }>
        <span className={ styles.title }>Pay with card</span>
        <img className={ styles.img } src={ visa } alt='' />
        <img className={ styles.img } src={ masterCard } alt='' />
      </div>
      <form className={ styles.form }>
        <Input
            label='Card number'
            name='cardNumber'
            className={ styles.input }
            register={ register }
            errors={ errors }
            required
          />
          <Input
            label='Expiration Date (MM/YY)'
            name='expirationDate'
            className={ styles.input }
            register={ register }
            errors={ errors }
            required
          />
          <Input
            label='CVV (3 digits)'
            name='cvv'
            className={ styles.input }
            register={ register }
            errors={ errors }
            required
          />
      </form>
    </div>
  );
}

export default CardForm;
