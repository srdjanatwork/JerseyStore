import React from 'react';
import { withRouter } from "react-router";
import TeamView from 'components/TeamView';
// import styles from './Team.module.scss';

const Team = ({ history, currentUser }) => {
  const team = history.location.state.team;
  return (
    <div>
      <TeamView currentUser={ currentUser } team={ team } />
    </div>
  );
};

export default withRouter(Team);
