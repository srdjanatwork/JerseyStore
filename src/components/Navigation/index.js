import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import Modal from 'components/shared/Modal';
import ShoppingCart from 'components/ShoppingCart';

import styles from './Navigation.module.scss';

const iconStyles = {
  marginLeft: 10,
  marginRight: 10
}

const Navigation = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const openShoppingCartModal = () => {
    setIsOpenedModal(true);
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    setIsOpenedModal(false);
    document.body.classList.remove('modal-open');
  }

  return (
    <ShoppingCartConsumer>
      {({ cartInfo }) => {
        return (
          <div className={ styles.navigation }>
           <div className={ styles.someContent }>Some content</div>
           <div className={ styles.logo }>Logo</div>
           <div className={ styles.iconsWrapper }>
             <SearchIcon fontSize="large" />
             <Link to='/login'>
               <AccountBoxIcon style={ iconStyles } fontSize="large" />
             </Link>
             <button className={ styles.shoppingCartButton } onClick={ openShoppingCartModal }>
               <ShoppingCartIcon fontSize="large" />
               { cartInfo.jerseys.length > 0 && <span className={ styles.count }>{ cartInfo.jerseys.length }</span> }
             </button>
           </div>
           { isOpenedModal &&
           <Modal
             isShoppingCartModal
             closeModal={ closeModal }
            >
             <ShoppingCart closeModal={ closeModal } cartInfo={ cartInfo } />
           </Modal>
           }
         </div>
        );
      }}
     </ShoppingCartConsumer>
  );
}

export default Navigation;
