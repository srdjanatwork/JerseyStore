import React from 'react';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import styles from './Modal.module.scss';

const Modal = ({ children, closeModal, isShoppingCartModal }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const modalContentClasses = classNames({
    [styles.modalContent]: true,
    [styles.modalContentShoppingCart]: isShoppingCartModal
  });

  return (
    <div className={ styles.modalWrapper } onClick={ closeModal }>
      <div className={ modalContentClasses } onClick={(event) => stopPropagation(event)}>
        <button className={ styles.closeModalButton } onClick={ closeModal }>
          <CloseIcon style={{ color: '#8CD0E3', fontSize: 40 }} />
        </button>
        { children }
      </div>
    </div>
  );
}

export default Modal;
