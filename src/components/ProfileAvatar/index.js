import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getInitialsHelper } from 'utils/helpers/getInitials';

const ProfileAvatar = ({ currentUser, imgSrc, isSmall }) => {
  const noImgStyle = {
    width: isSmall ? '40px' : '200px',
    height: isSmall ? '40px' : '200px',
    backgroundColor: imgSrc ? 'transparent' : '#f5ea77',
    color: '#000',
    fontSize: isSmall ? 'inherit' : '30px',
    margin: isSmall ? '0' : '0 auto 50px auto',
    borderRadius: '50%'
  };

  return (
    <>
      { (imgSrc) ?
        <img src={ imgSrc } style={ noImgStyle } alt='' /> :
        <Avatar alt='' style={ noImgStyle }>{ getInitialsHelper(currentUser.displayName) }</Avatar>
      }
    </>
  );
}

export default ProfileAvatar;
