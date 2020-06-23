import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import { RouteList } from 'lib/routes';
import ShoppingCartControls from 'components/ShoppingCartControls';
import CartAccountInfo from 'components/CartAccountInfo';
import Clickable from 'components/shared/Clickable';
import CartTotal from 'components/CartTotal';
import CouponControl from 'components/CouponControl';
import styles from './Cart.module.scss';

const Cart = ({ currentUser }) => {
  let user = localStorage.getItem('user');
  let userParsed = JSON.parse(user);
  let applied = userParsed.coupon.applied;

  return (
    <ShoppingCartConsumer>
      {({ cartInfo }) => {
        return (cartInfo.total > 0) ? (
          <div className={ styles.shoppingCartContainer }>
            <h1 className={ styles.shoppingCartTitle }>Shopping cart</h1>
            <div className={ styles.shoppingCartWrapper }>
              <ShoppingCartControls cartInfo={ cartInfo } />
              <div>
                <div className={ styles.priceWrapper }>
                  <div className={ styles.infoWrapper }>
                    <div className={ styles.item }>
                      <span>Subtotal:</span>
                      <span>{ cartInfo.total }€</span>
                    </div>
                    <CouponControl
                      currentUser={ currentUser }
                      cartInfo={ cartInfo }
                    />
                  </div>
                  <CartTotal
                    cartInfo={ cartInfo }
                    applied={ applied }
                    label='Grand total:'
                  />
                </div>
                <div className={ styles.userLoginInfo }>
                  { !currentUser && <CartAccountInfo /> }
                  { (currentUser && !currentUser.emailVerified) && <span className={ styles.verifyMsg }>Please verify your email</span> }
                  <Clickable
                    tag={ Link }
                    className={ styles.checkoutLink }
                    to={ RouteList.checkout }
                    disabled={ !currentUser || (currentUser && !currentUser.emailVerified) }
                  >Checkout
                  </Clickable>
                </div>
              </div>
            </div>
          </div>
        ) : <div className={ styles.emptyCart }><p>Your cart is empty</p></div>;
      }}
     </ShoppingCartConsumer>
  );
}

export default Cart;
