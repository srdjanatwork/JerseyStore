import React from 'react';

import styles from './Team.module.scss';

const Team = ({ team }) => {
  return (
    <div className={ styles.team }>
      <img className={ styles.jersey } src={ team.homeKit } />
      <div className={ styles.nameLogoWrapper }>
        <span>{ team.name }</span>
        <img src={ team.logo } />
      </div>
      <span className={ styles.text }>{ team.text }</span>
      <span className={ styles.price }>Price: { team.price }€</span>
    </div>
  );
}

export default Team;
