import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { RouteList } from 'lib/routes';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Rating from 'components/Rating'
import Modal from 'components/shared/Modal';
import TeamView from 'components/TeamView';
import Clickable from 'components/shared/Clickable';
import styles from './Team.module.scss';

const Team = ({ team, history }) => {
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

  const viewDetails = () => {
    history.push({
      pathname: `${ RouteList.team }/${ team.slug }`,
      state: { team }
    });
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
        <Clickable
          onClick={ viewDetails }
          className={ styles.button }
        >
         View details
        </Clickable>
        <Clickable
          onClick={ purchase }
          className={ styles.button }
        >
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
        </Clickable>
      </div>
      { isOpen &&
       <Modal closeModal={ closeModal }>
         <TeamView closeModal={ closeModal } team={ team } />
       </Modal>
      }
    </div>
  );
}

export default withRouter(Team);

// localStorage.setItem('testObject', JSON.stringify(testObject));
//
// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');
//
// console.log('retrievedObject: ', JSON.parse(retrievedObject));
