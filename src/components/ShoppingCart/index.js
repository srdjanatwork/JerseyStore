import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartList from 'components/ShoppingCartList';
import Clickable from 'components/shared/Clickable';
import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ cartInfo, closeModal }) => {
  const cartLength = cartInfo.jerseys.length;
  const keepShopping = () => {
    closeModal();
  }

  const closeModalHandler = () => {
    closeModal();
  }

  return (
    <div className={ styles.shoppingCartWrapper }>
      { cartLength > 0 &&
        <div className={ styles.buttonLinkWrapper }>
          <Clickable
            tag='button'
            className={ styles.clickableLink }
            onClick={ keepShopping }
            transparent
          >
            KEEP SHOPPING
          </Clickable>
          <Clickable
            tag={ Link }
            onClick={ closeModalHandler }
            className={ styles.clickableLink }
            to='/cart'
            transparent
          >
            VIEW FULL SHOPPING BAG
          </Clickable>
        </div>
      }
      <div className={ styles.contentWrapper }>
        <h1 className={ styles.title }>Shopping cart</h1>
        <span>({ cartLength } items)</span>
        { cartLength < 1 ?
          <p className={ styles.emptyText }>Your card is empty</p> :
          <ShoppingCartList closeModal={ closeModal } cartInfo={ cartInfo } />
        }
      </div>
    </div>
  );
}

export default ShoppingCart;
