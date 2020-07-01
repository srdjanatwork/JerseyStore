import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Colors } from 'lib/colors';
import { Collection } from 'lib/collection';
import { getImage } from 'utils/helpers/image';
import Rating from 'components/Rating';
import Clickable from 'components/shared/Clickable';
import ProfileAvatar from 'components/ProfileAvatar';
import app from '../../base';
import styles from './Comment.module.scss';

const Comment = ({ comment, currentUser }) => {
  const db = app.firestore();
  const [imgSrc, setImgSrc] = useState();
  const [likes, setLikes] = useState();
  const imagePromise = comment.avatar && getImage(app, 'images', comment.avatar);
  imagePromise && imagePromise.getDownloadURL().then(url => setUrl(url));
  const isNotLoggedIn = Object.keys(currentUser).length === 0 && currentUser.constructor === Object

  const setUrl = (url) => {
    setImgSrc(url);
  }

  useEffect(() => {
    db.collection(Collection.comments).doc(comment.commentID).get().then(documentSnapshot => {
      const data = documentSnapshot.data();
      setLikes(data.likes)
    })
  },[comment, db])

  const like = () => {
    if (!isNotLoggedIn) {
      if (likes && !likes.includes(currentUser.uid)) {
        db.collection(Collection.comments)
          .doc(comment.commentID)
          .update({
            'likes': [...likes, currentUser.uid]
          })
        setLikes([...likes, currentUser.uid]);
      } else {
        const updateArr = likes.filter((_like, i) => likes[i] !== currentUser.uid);
        db.collection(Collection.comments)
          .doc(comment.commentID)
          .update({
            'likes': updateArr
          })
        setLikes(updateArr);
      }
    }
  };

  const reply = () => {};

  const buttonClasses = classNames({
    [styles.button]: true,
    [styles.buttonLiked]: likes && likes.includes(currentUser.uid)
  });

  return (
    <div className={ styles.commentWrapper }>
      <div className={ styles.commentInner }>
        <div className={ styles.leftSide }>
          <span className={ styles.date }>{ comment.date }</span>
          <div className={ styles.ratingWrapper }>
            <Rating rating={ comment.rating } />
          </div>
        </div>
        <div className={ styles.rightSide }>
          <ProfileAvatar
            user={ currentUser }
            imgSrc={ imgSrc }
            name={ currentUser.displayName }
            isSmall
          />
          <div className={ styles.rightSideWrapper }>
            <div className={ styles.userNameTextWrapper }>
              <span className={ styles.userName }>{ comment.userName }</span>
              <span>{ comment.value }</span>
              { (likes && likes.length > 0) &&
                <div className={ styles.likeWrapper }>
                  <span className={ styles.likeNumber }>{ likes.length }</span>
                  <ThumbUpAltIcon
                    className={ styles.likeIcon }
                    style={{ fill: Colors.commentLike }}
                  />
                </div>
              }
            </div>
            <div className={ styles.buttonWrapper }>
              <Clickable
                className={ buttonClasses }
                transparent
                onClick={ like }
              >
                Like
              </Clickable>
              <Clickable
                className={ styles.button }
                transparent
                onClick={ reply }
              >
                Reply
              </Clickable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
