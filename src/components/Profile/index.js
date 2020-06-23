import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { RouteList } from 'lib/routes';
import { INPUT_NAME } from 'lib/inputName';
import { Collection } from 'lib/collection';
import { getImage, uploadImage } from 'utils/helpers/image';
import { updateDbUserCollection } from 'utils/helpers/database';
import Clickable from 'components/shared/Clickable';
import ProfileInfoControl from 'components/ProfileInfoControl';
import ProfileAvatar from 'components/ProfileAvatar';
import Input from 'components/shared/Input';
import app from '../../base';
import styles from './Profile.module.scss';

const Profile = ({ currentUser, imgSrc, history, closeModal }) => {
  const { handleSubmit, getValues, register, errors } = useForm({ mode: 'onChange' });
  const [buttonState, setButtonState] = useState(false);
  const [values, setValues] = useState({});
  const [verificationMsg, setMsg] = useState();
  const [errorMsg, setError] = useState();
  const [url, setUrl] = useState(imgSrc);
  const db = app.firestore();
  const userUid = currentUser && currentUser.uid;
  const user = app.auth().currentUser;

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
    if (user && values.fullName) {
      user.updateProfile({
       displayName: values.fullName ? values.fullName : user.displayName,
      })
      updateDbUserCollection(
        db, Collection.users, userUid, 'displayName', values.fullName, currentUser
      );
    }

    if (user && values.email) {
      user.updateEmail(values.email).then(() => {
        setMsg(`Verification link sent to ${values.email}`);
        user.sendEmailVerification();
        updateDbUserCollection(
          db, Collection.users, userUid, 'email', values.email, currentUser
        );
      }).catch(error => setError(error.message));
    }
  }

  const setIsShownHandler = (isShown) => {
    console.log('isShown', isShown);
    if (isShown) {
      setButtonState(false);
    }
  }

  const onChangeHandler = () => {
    // upload image helper
    uploadImage(app, 'images', getValues('avatar'), userUid)

    user.updateProfile({
      photoURL: getValues('avatar').length > 0 ? `${userUid}` : null
    }).then(() => {
      // get image helper return Promise
      const imagePromise = getImage(app, 'images', userUid);
      imagePromise.getDownloadURL().then(url => setUrl(url));
    });
    setButtonState(true);
  }

  return (
    <div className={ styles.profileWrapper }>
      <form onSubmit={ handleSubmit(saveDataHandler) }>
        { currentUser &&
          <div className={ styles.avatarWrapper }>
            <CameraAltIcon className={ styles.camera } fontSize='large' />
            <ProfileAvatar user={ user } name={ values.fullName } imgSrc={ url } />
            <Input
              register={ register }
              name='avatar'
              elementType='input'
              className={ styles.registerFileInput }
              elementConfig={{
                "type": "file",
                "accept": "image/png, image/jpeg"
              }}
              errors={ errors }
              onChangeHandler={ onChangeHandler }
            />
          </div>
        }
        <div className={ styles.profileInfoWrapper }>
          <ProfileInfoControl
            info={ user.displayName }
            infoLabel={ INPUT_NAME.fullName }
            sendUpdatedInfo={ updatedInfoHandler }
            setIsShownHandler={ setIsShownHandler }
          />
          <ProfileInfoControl
            info={ user.email }
            infoLabel={ INPUT_NAME.email }
            sendUpdatedInfo={ updatedInfoHandler }
            setIsShownHandler={ setIsShownHandler }
          />
        </div>
        <span className={ styles.verificationMsg }>{ verificationMsg }</span>
        <span className={ styles.verificationMsg }>{ errorMsg }</span>
        <div className={ styles.buttonWrapper }>
          <Clickable
            className={ styles.button }
            disabled={ !buttonState }
          >
            Save
          </Clickable>
          <Clickable
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
