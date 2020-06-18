import React from 'react';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import CheckoutProgress from 'components/CheckoutProgress';
import Orders from 'components/Orders';
import styles from './Checkout.module.scss';

const Checkout = () => {
  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        return (
          <div className={ styles.checkoutContainer }>
            <CheckoutProgress />
            <div className={ styles.sectionWrapper }>
              <Orders currentUser={ currentUser } />
            </div>
          </div>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Checkout;
