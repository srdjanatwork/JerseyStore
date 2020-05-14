import React from 'react';

import FilterSection from 'components/FilterSection'

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={ styles.home }>
      <div className={ styles.filterSection }>
        <FilterSection />
      </div>
      <div className={ styles.sliderSection }>slider</div>
    </div>
  );
}

export default Home;
