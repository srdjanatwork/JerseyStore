import React, { useState, useContext } from 'react';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import Rating from 'components/Rating';
import Input from 'components/shared/Input';
import styles from './TeamView.module.scss';

const TeamView = ({ team }) => {
  const countries = useContext(CountriesContext);
  const [isHomeJersey, setIsHomeJersey] = useState(true);
  const [count, setCount] = useState(1);

  const changeJersey = () => {
    setIsHomeJersey(!isHomeJersey);
  }

  const changeCount = (type) => {
    if (type === 'decrease') {
      setCount(count => count - 1);

      if (count < 2) {
        setCount(1);
      }
    }

    if (type === 'increase') {
      setCount(count => count + 1);

      if (count > 9) {
        setCount(10);
      }
    }
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
        <div className={ styles.quantityWrapper }>
          <button className={ styles.quantityButton } onClick={ () => changeCount('decrease') }>-</button>
          <Input
            elementType='input'
            elementConfig={{
              'type': 'number',
              'min': '1',
              'max': '10'
            }}
            value={ count }
            className={ styles.input }
            onChangeHandler={ () => {} }
          />
          <button className={ styles.quantityButton } onClick={ () => changeCount('increase') }>+</button>
        </div>
        <button className={ styles.addCardButton } onClick={ () => {} }>Add to card</button>
      </div>
    </div>
  );
}

export default TeamView;
