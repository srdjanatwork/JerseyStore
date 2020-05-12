import React from 'react';

import Catalog from 'components/Catalog';

import styles from './Home.module.scss';

const Home = () => {
  // console.log('home')
  return (
    <div className={ styles.home }>
      <Catalog />
    </div>
  );
}

export default Home;
