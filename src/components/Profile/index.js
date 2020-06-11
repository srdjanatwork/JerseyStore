import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import { RouteList } from 'lib/routes';
import { INPUT_NAME } from 'lib/inputName';
import Clickable from 'components/shared/Clickable';
import ProfileAvatar from 'components/ProfileAvatar';
import ProfileInfoControl from 'components/ProfileInfoControl';
import app from '../../base';
import styles from './Profile.module.scss';

const Profile = ({ currentUser, imgSrc, history, closeModal }) => {
  const { handleSubmit } = useForm({ mode: 'onChange' });
  const [buttonState, setButtonState] = useState(false);
  const [values, setValues] = useState({});
  const [verificationMsg, setMsg] = useState();
  const [errorMsg, setError] = useState();

  const logOut = () => {
    app.auth().signOut();
    history.push(RouteList.home)
    closeModal();
  }

  const updatedInfoHandler = (info, label) => {
    if (info) {
      setButtonState(true);
    }

    setValues({
      ...values,
      [label]: info
    })
  }


  const saveDataHandler = () => {
    currentUser.updateProfile({
     displayName: values.fullName ? values.fullName : currentUser.displayName,
    })

    if (values.email) {
      currentUser.updateEmail(values.email).then(() => {
        currentUser.sendEmailVerification();
        setMsg(`Verification link sent to ${values.email}`);
      }).catch(error => setError(error.message));
    }
  }

  const setIsShownHandler = (isShown) => {
    if (isShown) {
      setButtonState(false);
    }
  }

  return (
    <div className={ styles.profileWrapper }>
      <form onSubmit={ handleSubmit(saveDataHandler) }>
        { currentUser && <ProfileAvatar currentUser={ currentUser } imgSrc={ imgSrc } /> }
        <div className={ styles.profileInfoWrapper }>
          <ProfileInfoControl
            info={ currentUser.displayName }
            infoLabel={ INPUT_NAME.fullName }
            sendUpdatedInfo={ updatedInfoHandler }
            setIsShownHandler={ setIsShownHandler }
          />
          <ProfileInfoControl
            info={ currentUser.email }
            infoLabel={ INPUT_NAME.email }
            sendUpdatedInfo={ updatedInfoHandler }
            setIsShownHandler={ setIsShownHandler }
          />
        </div>
        <span className={ styles.verificationMsg }>{ verificationMsg }</span>
        <span className={ styles.verificationMsg }>{ errorMsg }</span>
        <div className={ styles.buttonWrapper }>
          <Clickable
            tag='button'
            className={ styles.button }
            disabled={ !buttonState }
          >
            Save
          </Clickable>
          <Clickable
            tag='button'
            className={ styles.button }
            onClick={ logOut }
          >
            Log Out
          </Clickable>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Profile);
