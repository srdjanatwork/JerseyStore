import React from 'react';
import Teams from 'components/Teams';
import NotFound from 'components/NotFound';
import styles from './ResultsSection.module.scss';

const ResultsSection = ({ filteredResults, data, loadMore }) => {
  let teamsResult = null;
  let teamResultsNumber = null;

  if (filteredResults && filteredResults.results.length === 0) {
    teamsResult = <NotFound />;
    teamResultsNumber = 0;
  } else if (filteredResults && filteredResults.results.length > 0) {
    teamsResult = <Teams loadMore={ loadMore } results={ filteredResults.results } />;
    teamResultsNumber = filteredResults.results.length;
  } else if (!filteredResults) {
    teamsResult = <Teams loadMore={ loadMore } results={ data.teams } allTeamsNumber={ data.allTeamsNumber } />;
    teamResultsNumber = data.allTeamsNumber;
  }

  return (
    <>
      <p className={ styles.found }>Teams: <span>{ teamResultsNumber }</span></p>
      { teamsResult }
    </>
  );
}

export default ResultsSection;
