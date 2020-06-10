import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParameterByName } from 'utils/helpers/getParamByName';
import { RouteList } from 'lib/routes';
import Clickable from 'components/shared/Clickable';
import app from '../../base';
import styles from './RegisterFinal.module.scss';

const RegisterFinal = ({ history }) => {
  const [confirmationMsg, setConfirmationMsg] = useState();

  const handleVerifyEmail = (auth, actionCode) => {
    auth.applyActionCode(actionCode).then(
      resp => setConfirmationMsg('You have registered successfully. Please log in')
    );
  }

  useEffect(() => {
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
      </div>
    </div>
  );
}

export default RegisterFinal;
