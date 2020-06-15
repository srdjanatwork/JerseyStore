import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { RouteList } from 'lib/routes';
import { INPUT_NAME } from 'lib/inputName';
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
  const [url, setUrl] = useState();


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
        setMsg(`Verification link sent to ${values.email}`);
        currentUser.sendEmailVerification();
      }).catch(error => setError(error.message));
    }
  }

  const setIsShownHandler = (isShown) => {
    if (isShown) {
      setButtonState(false);
    }
  }

  const onChangeHandler = () => {
    const user = app.auth().currentUser;
    let rootName = 'images';
    let file = getValues('avatar');
    let avatar = file && file[0];
    let storageRef = avatar && app.storage().ref(`${rootName}/${currentUser.displayName}-${avatar.name}`);
    /* eslint-disable no-unused-vars */
    let uploadTask = storageRef && storageRef.put(avatar);

    user.updateProfile({
      photoURL: `${currentUser.displayName}-${avatar.name}`
    }).then(() => {
      const updateUser = app.auth().currentUser;
      let storageRef = app.storage().ref();
      let spaceRef = updateUser.photoURL && storageRef.child(`images/${ updateUser.photoURL }`);
      storageRef.child(`images/${ updateUser.photoURL }`).getDownloadURL().then(url => setUrl(url))
    });

    setButtonState(true);
  }

  return (
    <div className={ styles.profileWrapper }>
      <form onSubmit={ handleSubmit(saveDataHandler) }>
        { currentUser &&
          <div className={ styles.avatarWrapper }>
            <CameraAltIcon className={ styles.camera } fontSize='large' />
            <ProfileAvatar currentUser={ currentUser } imgSrc={ url ? url : imgSrc } />
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
