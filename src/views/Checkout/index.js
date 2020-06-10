import React from 'react';
import { ShoppingCartConsumer } from 'utils/context/ShoppingCartProvider';
import { AuthContextConsumer } from 'utils/context/AuthContextProvider';
// import styles from './Checkout.module.scss';

const Checkout = () => {
  return (
    <AuthContextConsumer>
      {({ currentUser }) => {
        return (
          <ShoppingCartConsumer>
            {({ cartInfo }) => {
              return (
                <h1>Checkout page in progress</h1>
              );
            }}
           </ShoppingCartConsumer>
        );
      }}
    </AuthContextConsumer>
  );
}

export default Checkout;
