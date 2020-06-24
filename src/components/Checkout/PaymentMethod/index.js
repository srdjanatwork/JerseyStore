import React from 'react';
import palpayIcon from 'assets/images/paypal-icon.png'
import { paymentType } from 'lib/paymentType';
import PaymentIcon from '@material-ui/icons/Payment';
import Clickable from 'components/shared/Clickable';
import styles from './PaymentMethod.module.scss';

const PaymentMethod = ({ type, onClick }) => {
  return (
    <Clickable
      className={ styles.payOptionButton }
      transparent
      onClick={ onClick }
    >
       <div className={ styles.payOptionInner }>
          { type === paymentType.card ?
            <>
              <PaymentIcon />
              <span>Card</span>
            </> :
            <>
              <img className={ styles.paypalIcon } src={ palpayIcon } alt='' />
              <span>PayPal</span>
            </>
          }
        </div>
    </Clickable>
  );
}

export default PaymentMethod;
