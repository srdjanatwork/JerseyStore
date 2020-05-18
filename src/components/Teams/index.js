import React from 'react';
import Team from 'components/shared/Team';
import styles from './Teams.module.scss';

const Teams = ({ data }) => {
  // console.log('data', data);
  return (
    <div className={ styles.teams }>
      { data.map(team => <Team key={ team.name } team={ team } />) }
    </div>
  );
}

export default Teams;
