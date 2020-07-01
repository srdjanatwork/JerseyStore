import React, { useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { RouteList } from 'lib/routes';
import { Collection } from 'lib/collection';
import { uploadImage } from 'utils/helpers/image';
import { setUserCollection } from 'utils/helpers/users-database';
import { getVaucher } from 'utils/helpers/vaucherGenerator';
import Input from 'components/shared/Input';
import Clickable from 'components/shared/Clickable';
import app from '../../base';
import styles from './Register.module.scss';

const Register = ({ history }) => {
  const [isShownPass, setIsShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const { dirty } = formState;
  const db = app.firestore();

  const onSubmit = useCallback(async event => {
    try {
      await app
        .auth()
        app.auth().createUserWithEmailAndPassword(getValues('email'), getValues('password'))
        .then(() => {
          const user = app.auth().currentUser;
          const userUid = user.uid;
          user.sendEmailVerification();

          // upload image helper
          if (getValues('avatar').length > 0) {
            uploadImage(app, 'images', getValues('avatar'), userUid)
          }

          if (user) {
            user.updateProfile({
               displayName: `${getValues('firstName')} ${getValues('lastName')}`,
               photoURL: getValues('avatar').length > 0 ? `${ userUid }` : null,
            })
          }

          history.push({
            pathname: RouteList.login,
            state: {
              msg: `Verification link sent to ${getValues('email')}`,
              prevPath: RouteList.register
            }
          });

          const promoCode = getVaucher();

          // set database collection helper
          setUserCollection(
            db, Collection.users, userUid, getValues('firstName'), getValues('lastName'), getValues('email'), promoCode
          );

        }).catch(error => {
          setErrorMsg(error.message);
        })
      } catch (error) {
        console.log('error', error);
      }
  }, [history, getValues, db]);

  const handlePassVisibility = (event) => {
    event.preventDefault();
    setIsShown(!isShownPass);
  }

  const onChangeHandler = () => {
    setErrorMsg(null);
  }

  return (
    <div className={ styles.register }>
      <h1 className={ styles.title }>Create New Account</h1>
      <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.registerInputWrapper }>
          <Input
            label='First Name'
            name='firstName'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            onChangeHandler={ onChangeHandler }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            label='Last Name'
            name='lastName'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            onChangeHandler={ onChangeHandler }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            label='Profile picture'
            name='avatar'
            register={ register }
            className={ styles.registerFileInput }
            errors={ errors }
            elementConfig={{
              "type": "file",
              "accept": "image/png, image/jpeg"
            }}
            onChangeHandler={ onChangeHandler }
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            label='Email'
            name='email'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            onChangeHandler={ onChangeHandler }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Clickable
            onClick={ handlePassVisibility }
            className={ styles.showHidePassButton }
            transparent
          >
            { isShownPass ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' /> }
          </Clickable>
          <Input
            label='Password'
            name='password'
            className={ styles.registerInput }
            elementConfig={{ "type": isShownPass ? "text" : "password" }}
            register={ register }
            errors={ errors }
            onChangeHandler={ onChangeHandler }
            required
          />
        </div>
        <span className={ styles.errorMsg }>{ errorMsg }</span>
        <Clickable
          className={ styles.createAccountButton }
          disabled={ (!getValues('firstName') || !getValues('lastName') || !getValues('email') || !getValues('password')) || !dirty || (errors['firstName'] || errors['lastName'] || errors['email'] || errors['password']) }
        >
          Create Account
        </Clickable>
      </form>
    </div>
  );
}

export default withRouter(Register);
