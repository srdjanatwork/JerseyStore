import React from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import { Colors } from 'lib/colors';

const Rating = ({ rating }) => {
  const rows = [];
  for (var i = 1; i <= 5; i++) {
    rows.push(
      <FavoriteSharpIcon key={i} style={{ fill: rating >= i ? Colors.reviewedRating : Colors.defaultRating }} fontSize='small' />
    );
  }
  return rows;
}

export default Rating;
