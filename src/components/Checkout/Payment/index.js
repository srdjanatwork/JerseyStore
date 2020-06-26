import React, { useState } from 'react';
import { paymentType } from 'lib/paymentType';
import PaymentMethod from '../PaymentMethod';
import Clickable from 'components/shared/Clickable';
import CardForm from 'components/Checkout/CardForm';
import OrderSummary from 'components/Checkout/OrderSummary';
import styles from './Payment.module.scss';

const Payment = ({ currentUser }) => {
  const [selectedType, setType] = useState({
    card: false,
    paypal: false
  })
  const selectType = (type) => {
    setType({
      card: type === paymentType.card ? true : false,
      paypal: type === paymentType.paypal ? true : false
    })
  }

  const chooseDiffType = () => {
    if (selectedType.card) {
      setType({
        card: false,
        paypal: false
      })
    }

    if (selectedType.paypal) {
      setType({
        card: false,
        paypal: false
      })
    }
  }

  const style = {
    border: selectedType.paypal ? '3px solid green' : '0',
    marginTop: '5px'
  }

  return (
    <div>
      <span className={ styles.title }>3. SELECT PAYMENT METHOD</span>
      { (!selectedType.paypal && !selectedType.card) &&
        <div className={ styles.cardWrapper }>
          <PaymentMethod
            onClick={ () => selectType(paymentType.card) }
            type={ paymentType.card }
          />
        </div>
      }
      { !selectedType.card &&
        <div className={ styles.paymentWrapper } style={ style }>
          <PaymentMethod
            onClick={ () => selectType(paymentType.paypal)  }
            type={ paymentType.paypal }
          />
        </div>
      }
      { selectedType.card && <CardForm /> }
      { (selectedType.card || selectedType.paypal) &&
        <Clickable
          className={ styles.button }
          onClick={ chooseDiffType }
        >
          Choose another way to pay
        </Clickable>
      }
      { selectedType.paypal &&
        <span className={ styles.text }>You will be redirected to Paypal after clicking Pay Now.</span>
      }
      <OrderSummary currentUser={ currentUser } />
      <Clickable
        disabled
        className={ styles.payButton }
      >
        Pay now
      </Clickable>
    </div>
  );
}

export default Payment;
