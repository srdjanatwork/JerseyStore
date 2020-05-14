import React from 'react';

import CheckBoxCountries from './CheckBoxCountries';
import CheckBoxPrice from './CheckBoxPrice';
import CheckBoxAvailability from './CheckBoxAvailability';
import CheckBoxDiscount from './CheckBoxDiscount';

import styles from './FilterSection.module.scss';

const FilterSection = () => {
  return (
    <div className={ styles.filterSectionWrapper }>
       <div className={ styles.filterSection }>
         <CheckBoxCountries />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxPrice />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxAvailability />
       </div>
       <div className={ styles.filterSection }>
         <CheckBoxDiscount />
       </div>
    </div>
  );
}

export default FilterSection;
