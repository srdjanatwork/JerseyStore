import React from 'react';
import Team from 'components/Team';
import styles from './Teams.module.scss';

const Teams = ({ results, allTeamsNumber, loadMore }) => {
  return (
    <div className={ styles.teams }>
      <div className={ styles.teamWrapper }>{ results.map(team => <Team key={ team.name } team={ team } />) }</div>
      { (allTeamsNumber && (allTeamsNumber !== results.length)) &&
        <button className={ styles.button } onClick={ loadMore }>Load more...</button>
      }
    </div>
  );
}

export default Teams;
