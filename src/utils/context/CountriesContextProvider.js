import React, { createContext, useState, useEffect } from 'react';

export const CountriesContext = createContext();

const CountriesContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState();

  useEffect(() => {
    fetch('/countries')
      .then(response => response.json())
      .then(data => setCountriesData(data));
  }, []);

  return (
    <CountriesContext.Provider value={countriesData}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContextProvider;
