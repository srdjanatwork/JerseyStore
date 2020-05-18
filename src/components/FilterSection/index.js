import React, { useContext } from 'react';
import CheckBoxSection from './CheckBoxSection';
import { CountriesContext } from 'utils/context/CountriesContextProvider';
import { filterData } from './data';

import styles from './FilterSection.module.scss';

const FilterSection = ({
  handleCountriesFilter,
  handlePriceFilter,
  handleFilter
}) => {
  const countries = useContext(CountriesContext);
  return (
    <div className={ styles.filterSectionWrapper }>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ countries && countries }
           label={ filterData.countries.label }
           handleFilter={ handleCountriesFilter }
           isCountryFilter
          />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ filterData.price.options }
           label={ filterData.price.label }
           handleFilter={ handlePriceFilter }
         />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ filterData.availability.options }
           label={ filterData.availability.label }
           handleFilter={ handleFilter }
         />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ filterData.discount.options }
           label={ filterData.discount.label }
           handleFilter={ handleFilter }
          />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ filterData.new.options }
           label={ filterData.new.label }
           handleFilter={ handleFilter }
          />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxSection
           data={ filterData.rating.options }
           label={ filterData.rating.label }
           handleFilter={ handleFilter }
           reviewIcon
         />
       </div>
    </div>
  );
}

export default FilterSection;
