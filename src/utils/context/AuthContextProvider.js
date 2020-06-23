import React, { useState, useEffect, createContext } from 'react';
import app from '../../base';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userDataFromFirebase, setUserData] = useState(null);
  const [coupon, setCoupon] = useState();
  const db = app.firestore();

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setUserData(user)
      if (user) {
        let docRef = db.collection('users').doc(user.uid);
        docRef.get().then(doc => {
            if (doc.exists) {
              const data = doc.data();
              setCoupon({
                hash: data.coupon.hash,
                applied: data.coupon.applied
              });
              localStorage.setItem('user', JSON.stringify({
                user: user,
                coupon: {
                  hash: data.coupon.hash,
                  applied: data.coupon.applied
               }}))
            }

          }).catch(error => {
          console.log("Error getting document:", error);
        });
      } else {
        setCoupon(undefined);
      }
    });
  }, [setUserData, db]);

  const currentUser = coupon ? {
    ...userDataFromFirebase,
    coupon: coupon
  } : {
    ...userDataFromFirebase
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      { children }
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
