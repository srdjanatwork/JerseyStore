import React, { useState, useContext } from 'react';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Rating from 'components/Rating'
import Modal from 'components/shared/Modal';
import TeamView from 'components/TeamView';
import styles from './Team.module.scss';

const Team = ({ team }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    actions: { addToCart }
  } = useContext(ShoppingCartContext);

  const openTeamModal = () => {
    document.body.classList.add('modal-open');
    setIsOpen(true);
  }

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setIsOpen(false);
  }

  const purchase = () => {
    const startJerseyCount = 1;
    addToCart(team, startJerseyCount);
  }

  return (
    <div className={ styles.team }>
      <div className={ styles.viewButton } onClick={ openTeamModal }>
        <div className={ styles.imgWrapper }>
          <img className={ styles.img } src={ team.homeKit } alt='' />
          <span className={ styles.quickView }>Quick view</span>
        </div>
        <Rating rating={ team.rating } />
        <div className={ styles.titleWrapper }>
          <span>{ team.name }</span>
          <img className={ styles.icon } src={ team.logo } alt='' />
        </div>
        <span>{ team.text }</span>
        { team.new &&
          <div className={ styles.new }>
            <span>New</span>
          </div>
        }
      </div>
      <div>
        <button onClick={ purchase } className={ styles.button }>
        <span className={ styles.purchase }>Purchase:</span>
        <span className={ team.discount ? styles.oldPrice : styles.price }>
          { team.discount ? <del className={ styles.oldPrice }>{ team.price }€</del> : `${team.price}€` }
        </span>
        {
          team.discount &&
          <span className={ styles.discount }>
            { `${team.discount}€` }
          </span>
        }
        </button>
      </div>
      { isOpen &&
       <Modal closeModal={ closeModal }>
         <TeamView team={ team } />
       </Modal>
      }
    </div>
  );
}

export default Team;
