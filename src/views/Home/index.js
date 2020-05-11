import React, { useContext } from 'react';
import { TeamsContext } from 'utils/context/TeamsContextProvider';

import Catalog from 'components/Catalog';

import styles from './Home.module.scss';

const Home = () => {
  const teamArr = useContext(TeamsContext);
  console.log('teamArr', teamArr);
  return (
    <div className={ styles.Home }>
      <Catalog />
    </div>
  );
}

export default Home;
