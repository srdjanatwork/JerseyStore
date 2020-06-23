import React from 'react';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import styles from './Orders.module.scss';

const Orders = ({ currentUser }) => {
  return (
    <ShoppingCartConsumer>
      {({ cartInfo  }) => {
        const itemCount = cartInfo.jerseys.length;
        const { jerseys } = cartInfo;

        let total = (currentUser.coupon && currentUser.coupon.applied) ? (cartInfo.total - (cartInfo.total * 0.1)) : cartInfo.total;
        return (
          <div className={ styles.orderWrapper }>
            <span className={ styles.title }>YOUR ORDER ({ itemCount } { itemCount > 1 ? 'ITEMS' : 'ITEM' })</span>
            { jerseys.map(jersey => (
              <div className={ styles.orderItem } key={ jersey.id }>
                <img src={ jersey.homeKit } alt='' />
                <div className={ styles.orderInfo }>
                  <span className={ styles.teamName }>{ jersey.name }</span>
                  <span>Qty: { jersey.jerseyCount }</span>
                  <span className={ styles.price }>Price: { jersey.price }€</span>
                </div>
              </div>
            )) }
            <span className={ styles.total }>Total: { total }€</span>
           </div>
        );
      }}
    </ShoppingCartConsumer>
  );
}

export default Orders;
