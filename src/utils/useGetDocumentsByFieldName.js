import { useState, useEffect } from 'react';
import app from '../base';

export const useGetDocumentsByFieldName = (collectionName, fieldName, value) => {
  const db = app.firestore();
  const [comments, setComments] = useState();
  const [commentCount, setCommentCount] = useState();
  let commentArr = [];

  useEffect(() => {
    db.collection(collectionName).where(fieldName, "==", value)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              commentArr.push(doc.data());
              setComments(commentArr);
              setCommentCount(commentArr.length);
            });
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
  }, [collectionName, fieldName, value]);
  return { comments, commentCount };
};
