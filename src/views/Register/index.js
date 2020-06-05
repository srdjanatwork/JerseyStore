import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { MONTHS } from 'lib/months';
import { YEARS } from 'lib/years';
import { DAYS } from 'lib/days';
import Input from 'components/shared/Input';
import Clickable from 'components/shared/Clickable';
import styles from './Register.module.scss';

const Register = () => {
  const [isShownPass, setIsShown] = useState(false);
  const { register, handleSubmit, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const { dirty } = formState;

  const onSubmit = data => {
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birth: `${data.day}.${data.month}.${data.year}`,
      avatar: data.avatar
    }
    console.log(formattedData);
  };

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
        <div className={ styles.birthWrapper }>
          <div className={ styles.registerInputWrapper }>
            <Input
              elementType='select'
              label='Day'
              name='day'
              className={ styles.registerInput }
              elementConfig={{ options: DAYS }}
              register={ register }
            />
          </div>
          <div className={ styles.registerInputWrapper }>
            <Input
              elementType='select'
              label='Month'
              name='month'
              className={ styles.registerInput }
              elementConfig={{ options: MONTHS }}
              register={ register }
            />
          </div>
          <div className={ styles.registerInputWrapper }>
            <Input
              elementType='select'
              label='Year'
              name='year'
              className={ styles.registerInput }
              elementConfig={{ options: YEARS }}
              register={ register }
            />
          </div>
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
            register={register}
            errors={errors}
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

export default Register;
