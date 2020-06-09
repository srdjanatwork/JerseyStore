import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import Modal from 'components/shared/Modal';
import ShoppingCart from 'components/ShoppingCart';
import app from '../../base';

import styles from './Navigation.module.scss';

const iconStyles = {
  marginLeft: 10,
  marginRight: 10
}

const Navigation = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const openShoppingCartModal = () => {
    setIsOpenedModal(true);
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    setIsOpenedModal(false);
    document.body.classList.remove('modal-open');
  }

  const setUrl = (url) => {
    setImgSrc(url);
  }

  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        let storageRef = app.storage().ref();
        let spaceRef = currentUser && currentUser.photoURL && storageRef.child(`images/${ currentUser.photoURL }`);
        if (currentUser && currentUser.photoURL) {
          storageRef.child(`images/${ currentUser.photoURL }`).getDownloadURL().then(url => setUrl(url))
        }
        console.log('currentUser', currentUser);

        const noImgStyle = {
          width: '30px',
          height: '30px'
        };

        return (
          <ShoppingCartConsumer>
            {({ cartInfo }) => {
              return (
                <div className={ styles.navigation }>
                  <div className={ styles.someContent }>Some content</div>
                  <div className={ styles.logo }>Logo</div>
                  <div className={ styles.iconsWrapper }>
                    <SearchIcon fontSize="large" />
                    { (currentUser && currentUser.emailVerified) ?
                      <button className={ styles.profileButton }>
                        { currentUser.photoURL ?
                          <img src={ imgSrc } alt='' /> :
                          <PersonIcon style={noImgStyle} />
                        }
                      </button>
                      :
                      <Link to='/login'>
                        <AccountBoxIcon style={ iconStyles } fontSize="large" />
                      </Link> }
                    <button className={ styles.shoppingCartButton } onClick={ openShoppingCartModal }>
                      <ShoppingCartIcon fontSize="large" />
                      { cartInfo.jerseys.length > 0 && <span className={ styles.count }>{ cartInfo.jerseys.length }</span> }
                    </button>
                  </div>
                 { isOpenedModal &&
                 <Modal isShoppingCartModal closeModal={ closeModal }>
                   <ShoppingCart closeModal={ closeModal } cartInfo={ cartInfo } />
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
