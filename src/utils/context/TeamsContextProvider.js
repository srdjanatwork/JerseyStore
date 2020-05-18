import React, { createContext, useState, useEffect } from 'react';
import { useFetch } from 'utils/useFetch';

export const TeamsContext = createContext();

const TeamsContextProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [teams, setTeams] = useState([]);
  const res = useFetch(`/teams?startOffset=${offset}`);
  const response = res.response;
  const resultsLength = response && response.length;

  useEffect(() => {
    if (!response) {
      return;
    }
    setTeams(teams => teams.concat(response.results))
  }, [response]);

  console.log('response', response);

  return (
    <TeamsContext.Provider value={{
        offset,
        setOffset,
        teams,
        resultsLength
      }}>
      {children}
    </TeamsContext.Provider>
  );
};

export default TeamsContextProvider;
