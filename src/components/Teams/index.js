import React from 'react';
import Team from 'components/Team';
import Clickable from 'components/shared/Clickable';
import styles from './Teams.module.scss';

const Teams = ({ results, allTeamsNumber, loadMore }) => {
  return (
    <div className={ styles.teams }>
      <div className={ styles.teamWrapper }>
        { results.map(
           team => <Team key={ team.name } team={ team } />
          )
        }
      </div>
      { (allTeamsNumber && (allTeamsNumber !== results.length)) &&
        <Clickable className={ styles.button } onClick={ loadMore }>
          Load more...
        </Clickable>
      }
    </div>
  );
}

export default Teams;
