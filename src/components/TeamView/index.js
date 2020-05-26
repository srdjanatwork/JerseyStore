import React, { useState, useContext } from 'react';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import ShoppingCartContext from 'utils/context/ShoppingCartProvider';
import Rating from 'components/Rating';
import CounterInput from 'components/shared/CounterInput';
import styles from './TeamView.module.scss';

const TeamView = ({ team }) => {
  const countries = useContext(CountriesContext);
  const {
    actions: { addToCart }
  } = useContext(ShoppingCartContext);
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
  }

  let country = countries.find(country => country.id === team.countryId);
  let countryInfo = country && (
    <div className={ styles.countryFlagWrapper }>
      <span>{ country.name }</span>
      <img className={ styles.countryImage } src={`images/countries/${country.id}.png`} alt='' />
    </div>
  );

  const text = isHomeJersey ? 'away' : 'home';

  return (
    <div className={ styles.container }>
      <div className={ styles.imageWrapper }>
        <img src={ isHomeJersey ? team.homeKit : team.awayKit } alt='' />
        <button className={ styles.changeJerseyButton } onClick={ changeJersey }>View { text }</button>
      </div>
      <div className={ styles.contentWrapper }>
        { team.new && <span className={ styles.new }>New</span> }
        <div className={ styles.nameWrapper }>
          <h1 className={ styles.name }>{ team.name }</h1>
          <img src={ team.logo } alt='' />
        </div>
        <div className={ styles.reviewInfo }>
          <Rating rating={ team.rating } />
          <p className={ styles.reviewText }>Read 0 reviews or <span>write a Review</span></p>
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
        <button className={ styles.addCardButton } onClick={ addToCartHandler }>Add to card</button>
      </div>
    </div>
  );
}

export default TeamView;
