import React, { useState } from 'react';
import { tagType } from 'lib/tagTypes';
import Rating from 'components/Rating';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input'
import styles from './Review.module.scss';

const Review = ({ jersey }) => {
  const [value, setValue] = useState('');
  const [rate, setRate] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('---', value, rate);
  }

  const setRating = (rating) => {
    setRate(rating);
  }

  const onChangeHandler = (event) => {
    setValue(event.target.value);
  }

  return (
    <form onSubmit={ onSubmit } className={ styles.container }>
      <h1 className={ styles.title }>Please share your experience</h1>
      <span>Overall rating*</span>
      <Rating
        tag={ Clickable }
        rating={ 0 }
        type={ tagType.button }
        setRating={ setRating }
      />
      <span className={ styles.reviewTitle }>Review*</span>
      <Input
        elementType='textarea'
        name='review'
        className={ styles.input }
        value={ value }
        onChangeHandler={ onChangeHandler }
        elementConfig={{
          'rows': '10',
          'cols': '50'
        }}
      />
      <img className={ styles.img } src={ jersey } alt='' />
      <Clickable
        disabled={ value ===  '' || !rate }
        className={ styles.button }
      >
        Submit
      </Clickable>
    </form>
  );
}

export default Review;
