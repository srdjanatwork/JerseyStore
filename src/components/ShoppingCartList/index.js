import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import ShoppingCartControls from 'components/ShoppingCartControls';
import CartAccountInfo from 'components/CartAccountInfo';
import Clickable from 'components/shared/Clickable';
import CartTotal from 'components/CartTotal';
import styles from './ShoppingCartList.module.scss';

const ShoppingCartList = ({ cartInfo, closeModal }) => {
  const closeModalHandler = () => {
    closeModal();
  }

  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        let user = localStorage.getItem('user');
        let userParsed = JSON.parse(user);
        let applied = userParsed.coupon.applied;

        return (
          <div className={ styles.shoppingCartListWrapper }>
            <ShoppingCartControls cartInfo={ cartInfo } />
            <div className={ styles.priceWrapper }>
            <CartTotal
              cartInfo={ cartInfo }
              applied={ applied }
              label='Subtotal:'
            />
            </div>
            { currentUser.email &&
              <Clickable
                tag={ Link }
                onClick={ closeModalHandler }
                className={ styles.link }
                to={ RouteList.cart }
                transparent
              >
                { applied ?
                  'VIEW FULL SHOPPING BAG' :
                  'VIEW FULL SHOPPING BAG IF YOU HAVE UNUSED PROMO CODE'
                }
              </Clickable>
            }
            { !currentUser.email && <CartAccountInfo closeModal={ closeModalHandler } /> }
            { (currentUser && currentUser.email && !currentUser.emailVerified) &&
              <span className={ styles.verifyMsg }>Please verify your email</span>
            }
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
