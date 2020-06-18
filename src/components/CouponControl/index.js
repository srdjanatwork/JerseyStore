import React, { useState, useEffect } from 'react';
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import app from '../../base';
import styles from './CouponControl.module.scss';

const CouponControl = ({ currentUser, cartInfo, sendIsApplied }) => {
  const [isOpenedCouponForm, setCouponForm] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const db = app.firestore();
  const userUid = currentUser && currentUser.uid;

  const openCouponForm = () => {
    setCouponForm(!isOpenedCouponForm);
  }

  const applyCoupon = () => {
    setCouponForm(false);
    db.collection('users').doc(userUid).update({
      coupon: {
        hash: currentUser.coupon.hash[0],
        applied: true
      }
    })
  };

  useEffect(() => {
    let docRef = db.collection('users').doc(userUid);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (data.coupon.applied) {
          setIsApplied(true);
          sendIsApplied(true);
        }
      }
    })
  },[applyCoupon, userUid, db, currentUser])

  return (
    <>
      <div className={ styles.item }>
        <span>{ isApplied ? 'Discount' : 'Coupon code' }</span>
        { isApplied ?
          <span>{`-10%`}</span> :
          <Clickable
            onClick={ openCouponForm }
            className={ styles.infoButton }
            transparent
          >
           { isOpenedCouponForm ? 'Cancel' : 'Add promo code' }
          </Clickable>
        }
      </div>
      { isOpenedCouponForm &&
        <div className={ styles.couponForm }>
          <Input
            className={ styles.couponInput }
            elementConfig={{
              'type': 'text',
              'placeholder': 'Enter your coupon code',
              'maxLength': "4"
            }}
            onChangeHandler={ () => {} }
            value={ currentUser.coupon.hash[0] }
          />
          <Clickable
            className={ styles.applyButton }
            disabled={ false }
            onClick={ applyCoupon }
          >Apply</Clickable>
        </div>
      }
    </>
  );


}

export default CouponControl;
