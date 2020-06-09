import React, { useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Input from 'components/shared/Input';
import Clickable from 'components/shared/Clickable';
import app from '../../base';
import styles from './Register.module.scss';

const Register = ({ history }) => {
  const [isShownPass, setIsShown] = useState(false);
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const { dirty } = formState;

  const onSubmit = useCallback(async event => {
    try {
      await app
        .auth()
        app.auth().createUserWithEmailAndPassword(getValues('email'), getValues('password'))
        .then(() => {
          const user = app.auth().currentUser;
          user.sendEmailVerification();

          let rootName = 'images';
          let file = getValues('avatar');
          let avatar = file && file[0];
          let storageRef = avatar && app.storage().ref(`${rootName}/${getValues('firstName')}-${avatar.name}`);
          let uploadTask = storageRef && storageRef.put(avatar);

          if(user){
            user.updateProfile({
               displayName: getValues('firstName'),
               photoURL: avatar ? `${getValues('firstName')}-${avatar.name}` : null
            })
          }

          alert("Verification email sent to " + getValues('email'));
          history.push('/login');
        })
      } catch (error) {
        alert(error);
      }
  }, [history, getValues]);

  const handlePassVisibility = (event) => {
    event.preventDefault();
    setIsShown(!isShownPass);
  }

  return (
    <div className={ styles.register }>
      <h1 className={ styles.title }>Create New Account</h1>
      <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.registerInputWrapper }>
          <Input
            elementType='input'
            label='First Name'
            name='firstName'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            elementType='input'
            label='Last Name'
            name='lastName'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            elementType='input'
            label='Profile picture'
            name='avatar'
            register={ register }
            className={ styles.registerFileInput }
            errors={ errors }
            elementConfig={{
              "type": "file",
              "accept": "image/png, image/jpeg"
            }}
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Input
            elementType='input'
            label='Email'
            name='email'
            className={ styles.registerInput }
            register={ register }
            errors={ errors }
            required
          />
        </div>
        <div className={ styles.registerInputWrapper }>
          <Clickable
            tag='button'
            onClick={ handlePassVisibility }
            className={ styles.showHidePassButton }
            transparent
          >
            { isShownPass ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' /> }
          </Clickable>
          <Input
            elementType='input'
            label='Password'
            name='password'
            className={ styles.registerInput }
            elementConfig={{ "type": isShownPass ? "text" : "password" }}
            register={ register }
            errors={ errors }
            required
          />
        </div>
        <Clickable
          tag='button'
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
