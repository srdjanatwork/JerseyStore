import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { cityTypes } from '../data';
import Input from 'components/shared/Input';
import Clickable from 'components/shared/Clickable';
import styles from './DeliveryAddress.module.scss';

const DeliveryAddress = () => {
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const [cityType, setCityType] = useState('Suburb');

  const onChangeHandler = (event) => {
    setCityType(event.target.value);
  };

  return (
    <div>
      <span className={ styles.title }>2. DELIVERY ADDRESS</span>
      <span className={ styles.label }>All fields required*</span>
      <form className={ styles.form }>
        <Input
          label='Delivery Address'
          name='address'
          className={ styles.input }
          register={ register }
          errors={ errors }
          required
        />
        <Input
          label='Telephone'
          name='telephone'
          className={ styles.input }
          register={ register }
          errors={ errors }
          required
        />
        <div className={ styles.inputWrapper }>
          <div className={ styles.suburbTownWrapper }>
            <Input
              elementType='select'
              value={ cityType }
              label='Suburb/Town'
              name='suburbTown'
              className={ styles.input }
              register={ register }
              errors={ errors }
              onChangeHandler={ onChangeHandler }
              elementConfig={{ 'options': cityTypes }}
            />
          </div>
          <div className={ styles.postcodeWrapper }>
            <Input
              label='Postcode'
              name='postcode'
              className={ styles.input }
              register={ register }
              errors={ errors }
              required
            />
          </div>
        </div>
        <Input
          elementType='select'
          value={ cityType }
          label='State/teritory'
          name='stateTeritory'
          className={ styles.input }
          register={ register }
          errors={ errors }
          onChangeHandler={ onChangeHandler }
          elementConfig={{ 'options': cityTypes }}
        />
        <Input
          elementType='select'
          value={ cityType }
          label='Country'
          name='country'
          className={ styles.input }
          register={ register }
          errors={ errors }
          onChangeHandler={ onChangeHandler }
          elementConfig={{ 'options': cityTypes }}
        />
        <Clickable
          disabled
          className={ styles.button }
        >Save
        </Clickable>
      </form>
    </div>
  );
}

export default  DeliveryAddress;
