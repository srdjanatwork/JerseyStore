import React from 'react';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Team from 'components/Team';

import styles from './TeamSlider.module.scss';

const TeamSlider = ({ country }) => {
  return (
    <div className={ styles.teamSlider }>
       <ArrowBackIcon fontSize="large" />
        <div className={ styles.teams }>
          { country && country.teams.map(team => <Team key={ team.teamSlug } team={ team } />) }
        </div>
       <ArrowForwardIcon fontSize="large" />
    </div>
  );
}

export default TeamSlider;
