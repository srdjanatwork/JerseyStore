import React, { useState, useContext } from 'react';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Rating from 'components/Rating';
import CounterInput from 'components/shared/CounterInput';
import Clickable from 'components/shared/Clickable';
import Modal from 'components/shared/Modal';
import Review from 'components/Review';
import Comments from 'components/Comments';
import styles from './TeamView.module.scss';

const TeamView = ({ team, closeModal, currentUser }) => {
  const countries = useContext(CountriesContext);
  const { actions: { addToCart } } = useContext(ShoppingCartContext);
  const [isOpened, setIsOpened] = useState(false);
  const [isHomeJersey, setIsHomeJersey] = useState(true);
  const [counter, setCounterNum] = useState();

  const changeJersey = () => {
    setIsHomeJersey(!isHomeJersey);
  }

  const setCounter = (num) => {
    setCounterNum(num);
  }

  const addToCartHandler = () => {
    addToCart(team, counter);
    if (closeModal) {
      closeModal();
    }
  }

  const openReviewModal = () => {
    setIsOpened(true)
  }

  const closeModalHandler = () => {
    setIsOpened(false);
  }

  let country = countries && countries.find(country => country.id === team.countryId);
  let countryInfo = country && (
    <div className={ styles.countryFlagWrapper }>
      <span>{ country.name }</span>
      <img className={ styles.countryImage } src={`images/countries/${country.id}.png`} alt='' />
    </div>
  );

  const text = isHomeJersey ? 'away' : 'home';

  return (
    <div className={ styles.container }>
      <div className={ styles.wrapper }>
        <div className={ styles.imageWrapper }>
          <img src={ isHomeJersey ? team.homeKit : team.awayKit } alt='' />
          <Clickable
            className={ styles.changeJerseyButton }
            onClick={ changeJersey }
            transparent
          >
            View { text }
          </Clickable>
        </div>
        <div className={ styles.contentWrapper }>
          { team.new && <span className={ styles.new }>New</span> }
          <div className={ styles.nameWrapper }>
            <h1 className={ styles.name }>{ team.name }</h1>
            <img src={ team.logo } alt='' />
          </div>
          <div className={ styles.reviewInfo }>
            <Rating rating={ team.rating } />
            <p className={ styles.reviewText }>
              <Clickable
                transparent
                className={ styles.underlineButton }
                onClick={ () => {} }
              >
                Read 0 reviews
              </Clickable>
              <span className={ styles.or }>or</span>
              <Clickable
                transparent
                className={ styles.underlineButton }
                onClick={ openReviewModal }
              >
                write a Review
              </Clickable>
            </p>
          </div>
          <div className={ styles.countryInfo }>
            <span className={ styles.countryLabel }>Country:</span>
            { countryInfo }
          </div>
          <div className={ styles.clubInfo }>
            <h2 className={ styles.clubInfoTitle }>Club info:</h2>
            { team.trophies && team.trophies.map(item => (
              <div key={ item.label + item.times } className={ styles.trophiesWrapper }>
                <span>{ item.label }:</span>
                <span>{ item.times }</span>
              </div>
            )) }
          </div>
          <div className={ styles.priceWrapper }>
            <span className={ styles.priceLabel }>Price:</span>
            <span className={ team.discount ? styles.oldPrice : styles.price }>
              { team.discount ? <del className={ styles.oldPrice }>{ team.price }€</del> : `${team.price}€` }
            </span>
            {
              team.discount &&
              <span className={ styles.discount }>
                { `${team.discount}€` }
              </span>
            }
          </div>
          <CounterInput setCounter={ setCounter } />
          <Clickable
            className={ styles.addCardButton }
            onClick={ addToCartHandler }
          >
            Add to card
          </Clickable>
        </div>
      </div>
      <Comments currentUser={ currentUser } team={ team } />
      { isOpened &&
       <Modal closeModal={ closeModalHandler }>
         <Review currentUser={ currentUser } team={ team } />
       </Modal>
      }
    </div>
  );
}

export default TeamView;
