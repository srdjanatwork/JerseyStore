import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getInitialsHelper } from 'utils/helpers/getInitials';

const ProfileAvatar = ({ user, name, imgSrc, isSmall }) => {
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
      { imgSrc && <img src={ imgSrc } style={ noImgStyle } alt='' /> }
      { (!imgSrc && (name || user)) &&
        <Avatar alt='' style={ noImgStyle }>{ name ? getInitialsHelper(name) : getInitialsHelper(user.displayName) }</Avatar>
      }
    </>
  );
}

export default ProfileAvatar;
