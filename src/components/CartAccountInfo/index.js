import React from 'react';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import Clickable from 'components/shared/Clickable';
import styles from './CartAccountInfo.module.scss';

const CartAccountInfo = ({ closeModal }) => {
  const logInText = (
    <Clickable
      tag={ Link }
      className={ styles.loginLink }
      to='/login'
      transparent
      onClick={ closeModal }
    >log in</Clickable>
  );

  const signUpText = (
    <Clickable
      tag={ Link }
      className={ styles.loginLink }
      to='/login'
      transparent
      onClick={ closeModal }
    >
      sign up.
    </Clickable>
  );

  return (
    <div className={ styles.userInfo }>
      <div className={ styles.userInfoLogIn }>
        <InfoIcon fontSize='large'/>
        <div>
          <p>Please { logInText }.</p>
          <p>Don't have account? Please { signUpText }</p>
        </div>
      </div>
    </div>
  );
}

export default CartAccountInfo;
