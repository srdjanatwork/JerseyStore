import React from 'react';
import styles from './CreateAccountInfo.module.scss';

const CreateAccountInfo = () => {
  return (
    <>
      <h2 className={ styles.registerTitle }>New customer?</h2>
      <p className={ styles.registerText }>Create an account with us and you'll be able to:</p>
      <ul className={ styles.registerList }>
        <li>Check out faster</li>
        <li>Access your order history</li>
        <li>Track new orders</li>
        <li>Earn rewards</li>
      </ul>
    </>
  );
}

export default CreateAccountInfo;
