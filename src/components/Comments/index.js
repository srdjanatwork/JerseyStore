import React from 'react';
import { Collection } from 'lib/collection';
import { useGetDocumentsByFieldName } from 'utils/useGetDocumentsByFieldName';
import Comment from 'components/Comment';
import styles from './Comments.module.scss';

const Comments = ({ team, currentUser }) => {
  const comment =  useGetDocumentsByFieldName(Collection.comments, 'productID', team.id);
  const { comments, commentCount } = comment;

  return (
    <div className={ styles.commentsWrapper }>
     <div className={ styles.titleWrapper }>
       <span>All Comments({ commentCount ? commentCount : 0 })</span>
     </div>
     { comments && comments.map(comment => <Comment currentUser={ currentUser } key={ comment.commentID } comment={ comment } /> )}
    </div>
  );
}

export default Comments;
