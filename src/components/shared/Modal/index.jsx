import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styles from './Modal.module.scss';

const Modal = ({ children, closeModal }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  }
  return (
    <div className={ styles.modalWrapper } onClick={ closeModal }>
      <div className={ styles.modalContent } onClick={(event) => stopPropagation(event)}>
        <button className={ styles.closeModalButton } onClick={ closeModal }>
          <CloseIcon style={{ color: '#8CD0E3', fontSize: 40 }} />
        </button>
        { children }
      </div>
    </div>
  );
}

export default Modal;
