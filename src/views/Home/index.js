import React, { useContext, useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TeamsContext } from 'utils/context/TeamsContextProvider';
import FilterSection from 'components/FilterSection';
import ResultsSection from 'components/ResultsSection';
import styles from './Home.module.scss';

const priceMap = {
  0: '0-50',
  1: '50-100',
  2: '100'
}

const Home = () => {
  const data = useContext(TeamsContext);
  const [finalQueries, setFinalQueries] = useState();
  const [filteredResults, setFilteredResults] = useState();
  const [urlQueries, setUrlQueries] = useState({
    rating: null,
    new: null,
    availability: null,
    countryId: null,
    minPrice: null,
    maxPrice: null,
    discount: null
  });
  const [loading, setLoading] = useState();

  const setFilterByKey = {
    rating: (elementIndex, obj) => {
      return (obj[`${elementIndex}`] === true) ? (elementIndex + 1) : null
    },
    new: (elementIndex, obj) => {
      return (obj[`${elementIndex}`] === true) ? true : null
    },
    availability: (elementIndex, obj) => {
      const keys = Object.keys(obj);
      const availableOption = keys.shift();
      const unAvailableOption = keys[keys.length - 1];
      return obj[availableOption] ? true : obj[unAvailableOption] ? false : null;
    },
    discount: (elementIndex, obj) => {
      const keys = Object.keys(obj);
      const discountOption = keys.shift();
      const fullPriceOption = keys[keys.length - 1];
      return obj[discountOption] ? true : obj[fullPriceOption] ? false : null;
    }
  }

  const handleCountriesFilter = (idsArr) => {
    const stringIds = idsArr.join();
    setUrlQueries({
      ...urlQueries,
      countryId: idsArr.length > 0 ? stringIds : null
    })
  }

  const handlePriceFilter = (arr = null, elementIndex, obj) => {
    const itemString = priceMap[`${elementIndex}`];
    const lastItem = Object.keys(priceMap).length - 1;
    if (elementIndex === lastItem) {
       setUrlQueries({
         ...urlQueries,
         minPrice: obj[elementIndex] ? `${itemString}` : null,
       })
    } else {
      const formattedString = itemString.split('-');
      const minPrice = formattedString.shift();
      const maxPrice = formattedString[formattedString.length - 1]
      setUrlQueries({
        ...urlQueries,
        minPrice: obj[elementIndex] && minPrice ? minPrice : null,
        maxPrice: obj[elementIndex] && maxPrice ? maxPrice : null,
      })
    }
  }

  const handleFilter = (arr = null, elementIndex, obj, label) => {
    setUrlQueries({
      ...urlQueries,
      [`${label}`]: setFilterByKey[`${label}`](elementIndex, obj)
    })
  }

  useEffect(() => {
    const queryKeys = Object.keys(urlQueries);
    const queryParamArr= [];

    queryKeys.forEach(key => {
      if (urlQueries[key] !== null) {
        queryParamArr.push(`${key}=${urlQueries[key]}&`);
      }
    })
    const stringQueryParam = queryParamArr.join('');
    const finalQueriesString = stringQueryParam && stringQueryParam.substring(0, stringQueryParam.length - 1);

    setFinalQueries(finalQueriesString);
  }, [setFinalQueries, urlQueries]);

  useEffect(() => {
    if (finalQueries) {
      setLoading(true);
      fetch(`/teams?` + finalQueries)
        .then(response => response.json())
        .then(results => {
          setFilteredResults(results);
          setLoading(false);
        });
    } else {
      setFilteredResults(null);
    }
  }, [finalQueries, setFilteredResults])

  const loadMore = () => {
    data.setOffset(data.offset + 1);
  }

  return (
    <div className={ styles.home }>
      <div className={ styles.filterSection }>
        <FilterSection
          handleCountriesFilter={ handleCountriesFilter }
          handlePriceFilter={ handlePriceFilter }
          handleFilter={ handleFilter }
        />
      </div>
      <div className={ styles.teamsSection }>
        { loading ? <div className={ styles.loader }><CircularProgress /></div> :
        <ResultsSection
          filteredResults={ filteredResults }
          data={ data }
          loadMore={ loadMore }
        />
        }
      </div>
    </div>
  );
}

export default Home;
