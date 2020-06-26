import React from 'react';
import palpayIcon from 'assets/images/paypal-logo.png'
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './Orders.module.scss';

const Orders = ({ currentUser, nextStep }) => {
  const onChangeHandler = () => {};

  const goToNextStep = () => {
    nextStep(true);
  }

  return (
    <ShoppingCartConsumer>
      {({ cartInfo  }) => {
        const itemCount = cartInfo.jerseys.length;
        const { jerseys } = cartInfo;
        let total = (currentUser.coupon && currentUser.coupon.applied) ? (cartInfo.total - (cartInfo.total * 0.1)) : cartInfo.total;

        return (
          <div className={ styles.container }>
            <div>
              <span className={ styles.title }>1. YOUR ORDER ({ itemCount } { itemCount > 1 ? 'ITEMS' : 'ITEM' })</span>
              { jerseys.map(jersey => (
                <div className={ styles.orderItem } key={ jersey.id }>
                  <img src={ jersey.homeKit } alt='' />
                  <div className={ styles.orderInfo }>
                    <span className={ styles.teamName }>{ jersey.name }</span>
                    <span>Qty: { jersey.jerseyCount }</span>
                    <span className={ styles.price }>
                      Price:
                      <span className={ styles.bold }>{ jersey.discount ? jersey.jerseyCount * jersey.discount : jersey.jerseyCount * jersey.price }€</span>
                    </span>
                  </div>
                </div>
              )) }
              <span className={ styles.total }>Total: { total }€</span>
            </div>
            <div className={ styles.shippingWrapper }>
              <Input
                elementType='select'
                value='Test1'
                label='Shipping to:'
                className={ styles.input }
                onChangeHandler={ onChangeHandler }
                elementConfig={{
                  'options': [
                    {
                      'value': 'Test1',
                      'displayValue': 'Test1'
                    },
                    {
                      'value': 'Test2',
                      'displayValue': 'Test2'
                    }
                  ]
                }}
              />
            </div>
            <div className={ styles.buttonWrapper }>
              <span className={ styles.label }>For quick payment:</span>
              <Clickable className={ styles.paypal }>
                <div className={ styles.paypalInner }>
                  <span>Check out with</span>
                  <img src={ palpayIcon } alt='' />
                </div>
              </Clickable>
              <span className={ styles.info }>Use your PayPal account to complete the transaction and avoid entering billing or delivery information.</span>
              <span className={ styles.label }>Or, for other payment method</span>
              <Clickable
                className={ styles.continueButton }
                disabled={ false }
                onClick={ goToNextStep }
              >
                Continue to delivery address
              </Clickable>
            </div>
           </div>
        );
      }}
    </ShoppingCartConsumer>
  );
}

export default Orders;
