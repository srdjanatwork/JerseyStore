import React, { createContext, useState, useEffect } from 'react';

export const TeamsContext = createContext([]);

const TeamsContextProvider = ({ children }) => {
  const [teamData, setTeamData] = useState();

  useEffect(() => {
    fetch('/teams')
    .then(res => res.json())
    .then(teams => {
      setTeamData(teams)
    });
  }, []);

  return (
    <TeamsContext.Provider value={teamData}>
      {children}
    </TeamsContext.Provider>
  );
};

export default TeamsContextProvider;
