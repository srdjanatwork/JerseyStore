import React from 'react';
import { Link } from 'react-router-dom';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './Login.module.scss';

const Login = () => {
  const onChangeEmailHandler = () => {};
  const onChangePasswordHandler = () => {};
  const logIn = () => {};
  const forgetPassword = () => {};
  return (
    <div className={ styles.login }>
      <div className={ styles.loginWrapper }>
        <div className={ styles.signIn }>
          <div>
            <Input
              elementType='input'
              label='Email Address:'
              value='test1'
              onChangeHandler={ onChangeEmailHandler }
              className={ styles.emailInput }
            />
          </div>
          <div className={ styles.passwordInputWrapper }>
            <Input
              elementType='input'
              label='Password:'
              value='test2'
              onChangeHandler={ onChangePasswordHandler }
              className={ styles.passwordInput }
            />
          </div>
          <div className={ styles.buttonWrapper }>
            <Clickable
              tag='button'
              onClick={ logIn }
              className={ styles.signInButton }
              disabled
            >
              Sign In
            </Clickable>
            <Clickable
              tag='button'
              onClick={ forgetPassword }
              transparent
            >
              Forget your password?
            </Clickable>

          </div>
        </div>
        <div className={ styles.register }>
           <h2 className={ styles.registerTitle }>New customer?</h2>
           <p className={ styles.registerText }>Create an account with us and you'll be able to:</p>
           <ul className={ styles.registerList }>
             <li>Check out faster</li>
             <li>Access your order history</li>
             <li>Track new orders</li>
             <li>Earn rewards</li>
           </ul>
           <Clickable
             tag={ Link }
             to='/register'
             className={ styles.createAccountLink }
            >
             Create account
            </Clickable>
        </div>
      </div>
    </div>
  );
}

export default Login;
