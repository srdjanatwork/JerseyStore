import React from 'react';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import styles from './OrderSummary.module.scss';

const OrderSummary = ({ currentUser }) => {
  console.log('----', currentUser);
  return (
    <ShoppingCartConsumer>
      {({ cartInfo  }) => {
        const itemCount = cartInfo.jerseys.length;
        const { jerseys } = cartInfo;
        let total = (currentUser.coupon && currentUser.coupon.applied) ? (cartInfo.total - (cartInfo.total * 0.1)) : cartInfo.total;

        return (
          <div className={ styles.container }>
            <span className={ styles.title }>ORDER SUMMARY</span>
            { jerseys.map(jersey => (
                <div className={ styles.item } key={ jersey.name }>
                  <span>{`${ jersey.jerseyCount } x ${ jersey.name }`}</span>
                  <span className={ styles.price }>
                   { jersey.discount ? (jersey.jerseyCount * jersey.discount) : (jersey.jerseyCount * jersey.price) }€
                  </span>
                </div>
            ))}
            <div className={ styles.subtotal }>
              <span>Subtotal:</span>
              <span>{ total }€</span>
            </div>
            <div className={ styles.shipping }>
              <div className={ styles.shippingUpper }>
                <span>Shipping to country name</span>
                <span>Price</span>
              </div>
              <span>Shipping type</span>
            </div>
            <div className={ styles.totalOrder }>
              <span>ORDER TOTAL:</span>
              <span>{ total } + price€</span>
            </div>
          </div>
        );
      }}
    </ShoppingCartConsumer>
  );
}

export default OrderSummary;
