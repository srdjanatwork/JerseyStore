import React, { createContext, useState, useEffect } from 'react';
import { useFetch } from 'utils/useFetch';

export const TeamsContext = createContext();

const TeamsContextProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [teams, setTeams] = useState([]);
  const res = useFetch(`/teams?startOffset=${offset}`);
  const response = res.response;
  const allTeamsNumber = response && response.total;

  useEffect(() => {
    if (!response) {
      return;
    }
    setTeams(teams => teams.concat(response.results))
  }, [response]);

  return (
    <TeamsContext.Provider value={{
        offset,
        setOffset,
        teams,
        allTeamsNumber
      }}>
      {children}
    </TeamsContext.Provider>
  );
};

export default TeamsContextProvider;
