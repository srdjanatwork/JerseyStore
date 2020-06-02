import React, { useContext } from 'react';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import ShoppingCartControl from 'components/ShoppingCartControl';
import styles from './ShoppingCartControls.module.scss';

const ShoppingCartControls = ({ cartInfo }) => {
  const countries = useContext(CountriesContext);

  const getCountryInfo = (jersey) => {
    let country = countries.find(country => country.id === jersey.countryId);
    let countryInfo = country && (
      <div className={ styles.countryFlagWrapper }>
        <span className={ styles.countryName }>{ country.name }</span>
        <img className={ styles.countryImage } src={`images/countries/${country.id}.png`} alt='' />
      </div>
    );

    return countryInfo;
  }

  return (
    <>
      { cartInfo.jerseys.map((jersey, index) => (
        <div key={ jersey.id + index + jersey.name } className={ styles.shoppingCartListInner }>
          <img className={ styles.image } src={ jersey.homeKit } alt='' />
          <div className={ styles.shoppingCartListContent }>
            <div className={ styles.teamInfo }>
              <span className={ styles.jerseyName }>{ jersey.name }</span>
              { getCountryInfo(jersey) }
            </div>
            <ShoppingCartControl cartItemIndex={ index } jersey={ jersey }/>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShoppingCartControls;
