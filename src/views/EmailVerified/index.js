import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParameterByName } from 'utils/helpers/getParamByName';
import { RouteList } from 'lib/routes';
import Clickable from 'components/shared/Clickable';
import app from '../../base';
import styles from './EmailVerified.module.scss';

const EmailVerified = () => {
  const [confirmationMsg, setConfirmationMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const handleVerifyEmail = (auth, actionCode) => {
    auth.applyActionCode(actionCode).then(
      resp => {
        console.log('resp', resp);
        return setConfirmationMsg('Your email is verified. Please log in');
      }
    ).catch(error => setErrorMsg(error.message));
  }

  useEffect(() => {
    app.auth().signOut();
    let actionCode = getParameterByName('oobCode');
    handleVerifyEmail(app.auth(), actionCode)
  }, []);

  return (
    <div className={ styles.registerFinalWrapper }>
      <div>
        <p className={ styles.registerFinalText }>{ confirmationMsg }</p>
        <Clickable
          tag={ Link }
          to={ RouteList.login }
          className={ styles.registerFinalButton }
        >
          Go to log in
        </Clickable>
        { errorMsg }
      </div>
    </div>
  );
}

export default EmailVerified;
