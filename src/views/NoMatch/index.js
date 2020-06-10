import React from 'react';
import { withRouter } from "react-router";
import styles from './NoMatch.module.scss';

const NoMatch = ({ history }) => (
  <div className={ styles.noMatchWrapper }>
    <h3>No match for <code className={ styles.noMatch }>{ history.location.pathname }</code></h3>
  </div>
);

export default withRouter(NoMatch);
