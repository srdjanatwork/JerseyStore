import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { RouteList } from 'lib/routes';
import { ParamMode } from 'lib/paramMode';
import { getParameterByName } from 'utils/helpers/getParamByName';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import app from '../../base';
import firebase from 'firebase/app';
import styles from './EmailVerified.module.scss';

const EmailVerified = () => {
  const [confirmationMsg, setConfirmationMsg] = useState();
  const [isShownPass, setIsShown] = useState(false);
  const [isSwownLogInButton, setIsShownLogInButton] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const { register, handleSubmit, errors, getValues } = useForm({ mode: 'onChange' });
  const paramMode = getParameterByName('mode');

  const handleVerifyEmail = useCallback((auth, actionCode) => {
    if (paramMode !== ParamMode.resetPassword) {
      auth.applyActionCode(actionCode).then(
        resp => setConfirmationMsg('Your email is verified. Please log in')
      ).catch(error => setErrorMsg(error.message));
    }
  },[paramMode]);

  const handlePassVisibility = (event) => {
    event.preventDefault();
    setIsShown(!isShownPass);
  }

  const onPassUpdate = () => {
    firebase.auth().confirmPasswordReset(getParameterByName('oobCode'), getValues('newPassword'))
      .then(() => {
        console.log('----');
        setConfirmationMsg('Your password was successfully updated. Please log in');
        setIsShownLogInButton(true);
      })
      .catch((error) => {
        console.log('error', error.message);
      })
  };

  useEffect(() => {
    app.auth().signOut();
    let actionCode = getParameterByName('oobCode');
    handleVerifyEmail(app.auth(), actionCode);
  }, [handleVerifyEmail]);

  return (
    <div className={ styles.registerFinalWrapper }>
      <div>
        <p className={ styles.registerFinalText }>{ confirmationMsg }</p>
        { (paramMode === ParamMode.resetPassword && !isSwownLogInButton) &&
          <form onSubmit={ handleSubmit(onPassUpdate) }>
            <span className={ styles.resetPasswordTitle }>Reset your password:</span>
            <div>
              <Clickable
                onClick={ handlePassVisibility }
                className={ styles.showHidePassButton }
                transparent
              >
                { isShownPass ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' /> }
              </Clickable>
              <Input
                name='newPassword'
                className={ styles.registerInput }
                elementConfig={{ "type": isShownPass ? "text" : "password" }}
                register={ register }
                errors={ errors }
              />
            </div>
            <Clickable className={ styles.resetPasswordButton }>Reset password</Clickable>
          </form>
        }
        { (paramMode !== ParamMode.resetPassword || (paramMode === ParamMode.resetPassword && isSwownLogInButton)) &&
          <Clickable
            tag={ Link }
            to={ RouteList.login }
            className={ styles.registerFinalButton }
          >
            Go to log in
          </Clickable>
         }
         { errorMsg }
      </div>
    </div>
  );
}

export default EmailVerified;
