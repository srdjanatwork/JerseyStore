import React, { useCallback, useContext } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import app from '../../base';
import { AuthContext } from 'utils/context/AuthContextProvider';
import styles from './Login.module.scss';

const Login = ({ history }) => {
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const { dirty } = formState;
  const {
    actions: { addToUser }
  } = useContext(AuthContext);

  const logIn = useCallback(async event => {
    try {
      await app
        .auth()
        app.auth().signInWithEmailAndPassword(getValues('email'), getValues('password'))
        .then(() => {
          const user = app.auth().currentUser;
          if (user.emailVerified) {
            alert('Email is verified');
            addToUser(user);
            history.push('/');
          } else {
            alert('You must verify your email')
          }
        })
      } catch (error) {
        alert(error);
      }
  }, [history, getValues, addToUser]);

  const forgetPassword = () => {};

  return (
    <div className={ styles.login }>
      <div className={ styles.loginWrapper }>
        <div className={ styles.signIn }>
          <form onSubmit={ handleSubmit(logIn) }>
            <div>
              <Input
                elementType='input'
                label='Email Address:'
                name='email'
                className={ styles.emailInput }
                register={ register }
                errors={ errors }
              />
            </div>
            <div className={ styles.passwordInputWrapper }>
              <Input
                elementType='input'
                label='Password:'
                name='password'
                className={ styles.passwordInput }
                register={ register }
                errors={ errors }
              />
            </div>
            <div className={ styles.buttonWrapper }>
              <Clickable
                tag='button'
                className={ styles.signInButton }
                disabled={ (!getValues('email') || !getValues('password')) || !dirty || ( errors['email'] || errors['password']) }
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
          </form>
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

export default withRouter(Login);
