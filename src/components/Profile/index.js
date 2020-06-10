import React from 'react';
import { withRouter } from "react-router";
import { RouteList } from 'lib/routes';
import Clickable from 'components/shared/Clickable';
import ProfileAvatar from 'components/ProfileAvatar';
import ProfileInfoControl from 'components/ProfileInfoControl';
import app from '../../base';
import styles from './Profile.module.scss';

const Profile = ({ currentUser, imgSrc, history, closeModal }) => {
  console.log('currentUser', currentUser);

  const logOut = () => {
    app.auth().signOut();
    history.push(RouteList.home)
    closeModal();
  }

  const saveInfo = () => {
    console.log('SAVE INFO');
  }

  return (
    <div className={ styles.profileWrapper }>
      { currentUser && <ProfileAvatar currentUser={ currentUser } imgSrc={ imgSrc } /> }
      <div className={ styles.profileInfoWrapper }>
        <ProfileInfoControl info={ currentUser.displayName } infoLabel='Name' />
        <ProfileInfoControl info={ currentUser.email } infoLabel='Email' />
      </div>
      <div className={ styles.buttonWrapper }>
        <Clickable
          tag='button'
          className={ styles.button }
          onClick={ saveInfo }
          disabled={ true }
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
    </div>
  );
}

export default withRouter(Profile);
