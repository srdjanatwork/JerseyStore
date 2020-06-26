import React from 'react';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import Payment from 'components/Checkout/Payment';
import Orders from 'components/Checkout/Orders';
import styles from './Checkout.module.scss';

const Checkout = () => {
  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        return (
          <div className={ styles.checkoutContainer }>
            <div className={ styles.sectionWrapper }>
              <div className={ styles.sectionItem }>
                <Orders currentUser={ currentUser } />
              </div>
              <div className={ styles.sectionItem }>
                <DeliveryAddress />
              </div>
              <div className={ styles.sectionItem }>
                <Payment currentUser={ currentUser } />
              </div>
            </div>
          </div>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Checkout;
