import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { AuthContext } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import app from '../../base';
import styles from './Login.module.scss';

const Login = ({ history }) => {
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const [isVerified, setIsVerified] = useState(true);
  const { actions: { addToUser } } = useContext(AuthContext);
  const [noVerifiedMsg, setNoVerifiedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const { dirty } = formState;

  useEffect(() => {
    const locationState = history.location.state;
    if (!locationState) {
      return;
    }

    if (locationState.prevPath === RouteList.register) {
      setIsVerified(false);
    }
  }, [history.location.state])

  const logIn = useCallback(async event => {
    try {
      await app
        .auth()
        app.auth().signInWithEmailAndPassword(getValues('email'), getValues('password'))
        .then(() => {
          const user = app.auth().currentUser;
          if (user.emailVerified) {
            setIsVerified(true);
            addToUser(user);
            history.push(RouteList.home);
          } else {
            setNoVerifiedMsg('You must verify your email');
          }
        }).catch(error => {
          setErrorMsg(error.message);
        })
      } catch (error) {
        console.log('error', error.message);
      }
  }, [history, getValues, addToUser]);

  const forgetPassword = () => {};

  const onChangeHandler = () => {
    setErrorMsg(null);
  }

  return (
    <div className={ styles.login }>
     <div className={ styles.loginWrapper }>
       <div className={ styles.msgWrapper }>
           { !isVerified && history.location.state && <span className={ styles.verificationMsg }>{ history.location.state.msg }</span> }
           { noVerifiedMsg && <span className={ styles.verificationMsg }>{ noVerifiedMsg }</span> }
       </div>
       <div className={ styles.signInRegisterWrapper }>
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
                 onChangeHandler={ onChangeHandler }
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
                 onChangeHandler={ onChangeHandler }
               />
             </div>
             { errorMsg !== null && <span className={ styles.errorMsg }>{ errorMsg }</span> }
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
              to={ RouteList.register }
              className={ styles.createAccountLink }
             >
              Create account
             </Clickable>
         </div>
       </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
