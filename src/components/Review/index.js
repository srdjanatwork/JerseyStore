import React, { useState } from 'react';
import moment from 'moment';
import { tagType } from 'lib/tagTypes';
import { Collection } from 'lib/collection';
import { setCommentsCollection } from 'utils/helpers/comments-database';
import { getCommentID } from 'utils/helpers/vaucherGenerator';
import Rating from 'components/Rating';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input'
import styles from './Review.module.scss';

const Review = ({ team, currentUser }) => {
  const [value, setValue] = useState('');
  const [rate, setRate] = useState();
  const [error, setError] = useState();
  const isNotLoggedIn = Object.keys(currentUser).length === 0 && currentUser.constructor === Object

  const onSubmit = () => {
    let date = moment().format('MMMM Do YYYY');
    const commentIDArr = getCommentID();
    const commentID = commentIDArr.join('');

    if (value !== '' && !isNotLoggedIn) {
      setCommentsCollection(
        Collection.comments,
        commentID,
        currentUser,
        team.id,
        null,
        true,
        value,
        date
      );
    }

    if (isNotLoggedIn) {
      setError('You must be logged in');
    }
  }

  const setRating = (rating) => {
    setRate(rating);
  }

  const onChangeHandler = (event) => {
    setValue(event.target.value);

    if (event.target.value.length <= 3) {
      setError('Text is too short (minimum is 4 characters)')
    } else {
      setError('');
    }
  }

  return (
    <div className={ styles.container }>
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
      <span className={ styles.error }>{ error }</span>
      <img className={ styles.img } src={ team.homeKit } alt='' />
      <Clickable
        disabled={ value ===  '' || !rate }
        className={ styles.button }
        onClick={ onSubmit }
      >
        Submit
      </Clickable>
    </div>
  );
}

export default Review;
