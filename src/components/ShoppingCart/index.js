import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartList from 'components/ShoppingCartList';
import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ cartInfo }) => {
  const cartLength = cartInfo.jerseys.length;
  return (
    <div className={ styles.shoppingCartWrapper }>
      { cartLength > 0 &&
        <div className={ styles.buttonLinkWrapper }>
          <button className={ styles.button } onClick={ () => {} }>KEEP SHOPPING</button>
          <Link className={ styles.link } to='/'>VIEW FULL SHOPPING BAG</Link>
        </div>
      }
      <div className={ styles.contentWrapper }>
        <h1 className={ styles.title }>Shopping cart</h1>
        <span>({ cartLength } items)</span>
        { cartLength < 1 ?
          <p className={ styles.emptyText }>Your card is empty</p> :
          <ShoppingCartList cartInfo={ cartInfo } />
        }
      </div>
    </div>
  );
}

export default ShoppingCart;
