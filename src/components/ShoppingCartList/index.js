import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import ShoppingCartControls from 'components/ShoppingCartControls';
import CartAccountInfo from 'components/CartAccountInfo';
import Clickable from 'components/shared/Clickable';
import styles from './ShoppingCartList.module.scss';

const ShoppingCartList = ({ cartInfo, closeModal }) => {
  const closeModalHandler = () => {
    closeModal();
  }

  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        console.log('currentUser from shopping cart', currentUser);
        return (
          <div className={ styles.shoppingCartListWrapper }>
            <ShoppingCartControls cartInfo={ cartInfo } />
            <div className={ styles.priceWrapper }>
              <span>Subtotal:</span>
              <span>{ cartInfo.total }€</span>
            </div>
            <Clickable
              tag={ Link }
              onClick={ closeModalHandler }
              className={ styles.link }
              to={ RouteList.cart }
              transparent
            >
              { currentUser.coupon.applied ?
                'VIEW FULL SHOPPING BAG' :
                'VIEW FULL SHOPPING BAG IF YOU HAVE UNUSED PROMO CODE'
              }
            </Clickable>
            { !currentUser && <CartAccountInfo closeModal={ closeModalHandler } /> }
            { (currentUser && !currentUser.emailVerified) && <span className={ styles.verifyMsg }>Please verify your email</span> }
            <Clickable
              tag={ Link }
              className={ styles.checkoutLink }
              to={ RouteList.checkout }
              disabled={ !currentUser || (currentUser && !currentUser.emailVerified) }
              onClick={ closeModalHandler }
            >
              Checkout
            </Clickable>
          </div>
        );
      }}
    </AuthContextConsumer>
  );
}

export default ShoppingCartList;
