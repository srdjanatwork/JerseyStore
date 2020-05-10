import React from 'react';

import Catalog from 'components/Catalog';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={ styles.Home }>
      <Catalog />
    </div>
  );
}

export default Home;
