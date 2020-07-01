import app from '../../base';
const db = app.firestore();

export const setCommentsCollection = (
  collectionName, commentID, currentUser, productID, parentCommentID, valid, value, date
) => {
  db.collection(collectionName).doc(commentID).set({
    commentID: commentID,
    userID: currentUser.uid,
    userName: currentUser.displayName,
    avatar: currentUser.photoURL,
    productID: productID,
    parentCommentID: parentCommentID,
    valid: valid,
    value: value,
    date: date,
    likes: []
  });
};
