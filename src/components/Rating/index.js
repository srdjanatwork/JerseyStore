import React, { useState } from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import { tagType } from 'lib/tagTypes';
import { Colors } from 'lib/colors';
import styles from './Rating.module.scss';

const Rating = ({ rating, tag: Tag = tagType.div, className, type = tagType.div, setRating }) => {
  const rows = [];
  const [rate, setRate] = useState(rating)

  const setReview = (index) => {
    setRate(index);
    setRating(index);
  }

  for (let i = 1; i <= 5; i++) {
    rows.push(
      <Tag
        key={ i }
        transparent={ type === tagType.button ? true : null }
        className={ type === tagType.button ? styles.reviewed : null }
        onClick={ () => setReview(i) }
      >
        <FavoriteSharpIcon
          style={{ fill: rate >= i ? Colors.reviewedRating : type === tagType.button ? Colors.defaultRating : Colors.notReviewedRating }}
          fontSize={ type === tagType.div ? 'small' : 'large' }
        />
      </Tag>
    );
  }

  const style = {
    'display': 'flex',
    'justifyContent': type === tagType.div ? 'center' : 'inherit'
  };

  return (
    <div style={ style }>
      { rows }
    </div>
  );
}

export default Rating;
