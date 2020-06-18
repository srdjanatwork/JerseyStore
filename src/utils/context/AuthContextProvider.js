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
          }
        }).catch(error => {
          console.log("Error getting document:", error);
        });
      }
    });
  }, [setUserData, db]);

  const currentUser = {
    ...userDataFromFirebase,
    coupon: coupon
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      { children }
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
