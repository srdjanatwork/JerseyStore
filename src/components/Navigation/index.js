import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getImage } from 'utils/helpers/image';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import Modal from 'components/shared/Modal';
import ShoppingCart from 'components/ShoppingCart';
import Profile from 'components/Profile';
import ProfileAvatar from 'components/ProfileAvatar';
import Clickable from 'components/shared/Clickable';
import app from '../../base';

import styles from './Navigation.module.scss';

const iconStyles = {
  marginLeft: 10,
  marginRight: 10
}

const Navigation = () => {
  const [isOpenedShoppingModal, setIsOpenedShoppingModal] = useState(false);
  const [isOpenedProfileModal, setIsOpenedProfileModal] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const user = app.auth().currentUser;

  const openShoppingCartModal = () => {
    setIsOpenedShoppingModal(true);
    document.body.classList.add('modal-open');
  }

  const openProfileModal = () => {
    setIsOpenedProfileModal(true);
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    setIsOpenedShoppingModal(false);
    setIsOpenedProfileModal(false);
    document.body.classList.remove('modal-open');
  }

  const setUrl = (url) => {
    setImgSrc(url);
  }

  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        if (currentUser && currentUser.photoURL) {
          const imagePromise = getImage(app, 'images', currentUser.photoURL);
          imagePromise.getDownloadURL().then(url => setUrl(url));
        }

        if (user && user.photoURL) {
          const imagePromise = getImage(app, 'images', user.photoURL);
          imagePromise.getDownloadURL().then(url => setUrl(url));
        }

        return (
          <ShoppingCartConsumer>
            {({ cartInfo }) => {
              return (
                <div className={ styles.navigation }>
                  <div className={ styles.someContent }>Some content</div>
                  <Clickable
                    tag={ Link }
                    className={ styles.logo }
                    to={ RouteList.home }
                    transparent
                  >Logo
                  </Clickable>
                  <div className={ styles.iconsWrapper }>
                    <SearchIcon fontSize="large" />
                    { (currentUser && currentUser.emailVerified) ?
                      <button onClick={ openProfileModal } className={ styles.profileButton }>
                        <ProfileAvatar
                          user={ currentUser }
                          imgSrc={ imgSrc }
                          name={ (user && user.displayName) ? user.displayName : currentUser.displayName }
                          isSmall
                        />
                      </button>
                      :
                      <Clickable
                        tag={ Link }
                        to={ RouteList.login }
                        className={ styles.profileNoSignIn }
                        transparent
                      >
                        <AccountBoxIcon style={ iconStyles } fontSize="large" />
                      </Clickable> }
                    <button className={ styles.shoppingCartButton } onClick={ openShoppingCartModal }>
                      <ShoppingCartIcon fontSize="large" />
                      { cartInfo.jerseys.length > 0 && <span className={ styles.count }>{ cartInfo.jerseys.length }</span> }
                    </button>
                  </div>
                 { isOpenedShoppingModal &&
                 <Modal isOnRightSide closeModal={ closeModal }>
                   <ShoppingCart closeModal={ closeModal } cartInfo={ cartInfo } />
                 </Modal>
                 }
                 { (isOpenedProfileModal && (imgSrc || currentUser)) &&
                 <Modal isOnRightSide closeModal={ closeModal }>
                   <Profile
                     currentUser={ currentUser }
                     imgSrc={ imgSrc || currentUser.photoURL }
                     closeModal={ closeModal }
                   />
                 </Modal>
                 }
               </div>
              );
            }}
           </ShoppingCartConsumer>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Navigation;
