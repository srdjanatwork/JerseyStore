import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import { RouteList } from 'lib/routes';
import ShoppingCartControls from 'components/ShoppingCartControls';
import CartAccountInfo from 'components/CartAccountInfo';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './Cart.module.scss';

const Cart = () => {
  const [isOpenedCouponForm, setCouponForm] = useState(false);

  const openCouponForm = () => {
    setCouponForm(!isOpenedCouponForm);
  }

  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        return (
          <ShoppingCartConsumer>
            {({ cartInfo }) => {
              return cartInfo.total > 0 ? (
                <div className={ styles.shoppingCartContainer }>
                  <h1 className={ styles.shoppingCartTitle }>Shopping cart</h1>
                  <div className={ styles.shoppingCartWrapper }>
                    <div className={ styles.shoppingCartControls }>
                      <ShoppingCartControls cartInfo={ cartInfo } />
                    </div>
                    <div className={ styles.rightSide }>
                      <div className={ styles.priceWrapper }>
                        <div className={ styles.infoWrapper }>
                          <div className={ styles.item }>
                            <span>Subtotal:</span>
                            <span>{ cartInfo.total }€</span>
                          </div>
                          <div className={ styles.item }>
                            <span>Shipping:</span>
                            <span className={ styles.shipping }>0.00€</span>
                          </div>
                          <div className={ styles.item }>
                            <span>Coupon Code:</span>
                            <button
                              onClick={ openCouponForm }
                              className={ styles.couponButton }
                            >
                             { isOpenedCouponForm ? 'Cancel' : 'Add coupon' }
                            </button>
                          </div>
                          { isOpenedCouponForm &&
                            <div className={ styles.couponForm }>
                              <Input
                                elementType='input'
                                className={ styles.couponInput }
                                onChangeHandler={ () => {} }
                                elementConfig={{
                                  'type': 'text',
                                  'placeholder': 'Enter your coupon code',
                                  'maxLength': "4"
                                }}
                              />
                              <button className={ styles.applyButton }>APPLY</button>
                            </div>
                          }
                        </div>
                        <div className={ styles.item }>
                          <span>Grand total:</span>
                          <span>{ cartInfo.total }€</span>
                        </div>
                      </div>
                      <div className={ styles.userLoginInfo }>
                        { !currentUser && <CartAccountInfo /> }
                        { (currentUser && !currentUser.emailVerified) && <span className={ styles.verifyMsg }>Please verify your email</span> }
                        <Clickable
                          tag={ Link }
                          className={ styles.checkoutLink }
                          to={ RouteList.checkout }
                          disabled={ !currentUser || (currentUser && !currentUser.emailVerified) }
                        >
                          Checkout
                        </Clickable>
                      </div>
                    </div>
                  </div>
                </div>
              ) : <div className={ styles.emptyCart }><p>Your cart is empty</p></div>;
            }}
           </ShoppingCartConsumer>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Cart;
