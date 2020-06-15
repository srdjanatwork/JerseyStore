import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import googleIcon from 'assets/images/test.png'
import { AuthContext } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import Clickable from 'components/shared/Clickable';
import CreateAccountInfo from 'components/CreateAccountInfo';
import Input from 'components/shared/Input';
import app from '../../base';
import firebase from 'firebase/app';
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

  const forgetPassword = () => {
    let auth = app.auth();
    let emailAddress = getValues('email');

    auth.sendPasswordResetEmail(emailAddress).then(() => {
      setErrorMsg(`Your update password link was sent to ${getValues('email')}`)
    }).catch(error => {
      if (getValues('email') === '') {
        setErrorMsg(`Your must enter your email address`)
      } else {
        setErrorMsg(error.message);
      }
    });
  };

  const onChangeHandler = () => {
    setErrorMsg(null);
  }

  const signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className={ styles.login }>
     <div className={ styles.loginWrapper }>
       { !isVerified && history.location.state && <span className={ styles.verificationMsg }>{ history.location.state.msg }</span> }
       { noVerifiedMsg && <span className={ styles.verificationMsg }>{ noVerifiedMsg }</span> }
       <div className={ styles.signInRegisterWrapper }>
         <div className={ styles.signIn }>
           <form onSubmit={ handleSubmit(logIn) }>
             <Input
               label='Email Address:'
               name='email'
               className={ styles.input }
               register={ register }
               errors={ errors }
               onChangeHandler={ onChangeHandler }
             />
            <Input
               label='Password:'
               name='password'
               className={ styles.input }
               register={ register }
               errors={ errors }
               onChangeHandler={ onChangeHandler }
             />
             { errorMsg !== null && <span className={ styles.errorMsg }>{ errorMsg }</span> }
             <div className={ styles.buttonWrapper }>
               <Clickable
                 className={ styles.signInButton }
                 disabled={ (!getValues('email') || !getValues('password')) || !dirty || ( errors['email'] || errors['password']) }
               >
                 Sign In
               </Clickable>
              </div>
           </form>
           <Clickable onClick={ signInWithGoogle } className={ styles.signInWithGoogleButton }>
             <div className={ styles.googleIcon }><img src={ googleIcon } alt='' /></div>
             <span className={ styles.googleText }>Sign In with google</span>
           </Clickable>
           <Clickable onClick={ forgetPassword } className={ styles.forgetPasswordButton } transparent>
             Forget your password?
           </Clickable>
         </div>
         <div className={ styles.register }>
            <CreateAccountInfo />
            <Clickable tag={ Link } to={ RouteList.register } className={ styles.createAccountLink }>
              Create account
            </Clickable>
         </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
