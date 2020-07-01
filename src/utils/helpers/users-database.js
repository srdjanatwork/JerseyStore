export const setUserCollection = (db, collectionName, userID, firstName, lastName, email, coupon) => {
  db.collection(collectionName).doc(userID).set({
    displayName: `${firstName} ${lastName}`,
    email: email,
    coupon: coupon
  });
};

export const updateUserCollection = (db, collectionName, userID, field, updatedValue, user) => {
  db.collection(collectionName).doc(userID).update({
    displayName: field === 'displayName' ? updatedValue : user.displayName,
    email: field === 'email' ? updatedValue : user.email,
    coupon: field === 'coupon' ? updatedValue : user.coupon
  });
};

// export const getDbUserCollection = (db, collectionName, userID, testValue) => {
//   let docRef = db.collection(collectionName).doc(userID);
//   docRef.get().then(doc => {
//     if (doc.exists) {
//       testValue = doc.data();
//       return testValue;
//     }
//   })
// };
