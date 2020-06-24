import React, { useState } from 'react';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import CheckoutProgress from 'components/Checkout/CheckoutProgress';
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import Payment from 'components/Checkout/Payment';
import Orders from 'components/Checkout/Orders';
import styles from './Checkout.module.scss';

const Checkout = () => {
  const [stepState, setStepState] = useState({
    order: true,
    delivery: false,
    payment: false
  })
  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        return (
          <div className={ styles.checkoutContainer }>
            <CheckoutProgress stepState={ stepState } />
            <div className={ styles.sectionWrapper }>
              <div className={ styles.sectionItem }>
                <Orders currentUser={ currentUser } />
              </div>
              <div className={ styles.sectionItem }>
                <DeliveryAddress />
              </div>
              <div className={ styles.sectionItem }>
                <Payment />
              </div>
            </div>
          </div>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Checkout;
