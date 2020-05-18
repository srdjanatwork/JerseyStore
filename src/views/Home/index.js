import React, { useContext } from 'react';
import { TeamsContext } from 'utils/context/TeamsContextProvider';
import FilterSection from 'components/FilterSection';
import Teams from 'components/Teams';

import styles from './Home.module.scss';

const Home = () => {
  const data = useContext(TeamsContext);

  // console.log('data', data);

  const loadMore = () => {
    data.setOffset(data.offset + 1);
  }

  return (
    <div className={ styles.home }>
      <div className={ styles.filterSection }>
        <FilterSection />
      </div>
      <div className={ styles.teamsSection }>
        <Teams data={ data.teams } />
        { (data.resultsLength !== data.teams.length) &&
        <button className={ styles.button } onClick={ loadMore }>Load more...</button> }
      </div>
    </div>
  );
}

export default Home;
