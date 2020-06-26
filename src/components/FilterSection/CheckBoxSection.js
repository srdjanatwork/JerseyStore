import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import { usePrevious } from 'utils/useRef';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckBox from 'components/shared/CheckBox';
import Clickable from 'components/shared/Clickable';
import styles from './FilterSection.module.scss';


const CheckBoxSection = ({ data, label, reviewIcon, isCountryFilter, handleFilter }) => {
  let initialCheckState = {};

  if (!isCountryFilter) {
    for (let i = 0; i < data.length; i++) {
      initialCheckState = {
        ...initialCheckState,
        [i]: false
      }
    }
  }

  const [checkedObj, setChecked] = useState(initialCheckState);
  const [elementIndex, setElementIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const [expandAllCountries, setExpandAllCountries] = useState(false);
  const [countryIds, setCountryIds] = useState([]);
  const prevCountryIds = usePrevious(countryIds);

  const toggle = () => {
    setHeight(height === 0 ? 'auto' : 0);
  }

  const handleCheck = (index, item, checked, countryId) => {
    if (checked) {
      setCountryIds([...countryIds, countryId] || null)
    } else {
      const removedIndex = countryIds && countryIds.indexOf(countryId);
      const arr = [...countryIds];
      arr.splice(removedIndex, 1);
      setCountryIds(arr || null);
    }

    if(!isCountryFilter) {
      setChecked({
        ...initialCheckState,
        [index]: !checkedObj[index]
      });
    }
    setElementIndex(index);
  }

  useEffect(() => {
    if (prevCountryIds !== countryIds) {
      handleFilter(countryIds, elementIndex, checkedObj, label);
    }
  }, [handleFilter, prevCountryIds, countryIds, elementIndex, checkedObj, label]);

  const expandFilter = () => {
    setExpandAllCountries(!expandAllCountries);
  }

  const optionClasses = classNames({
    [styles.options]: true,
    [styles.optionsExpand]: isCountryFilter && expandAllCountries === true
  });

  return (
    <>
      <button className={ styles.button } onClick={ toggle }>
        <div className={ styles.buttonWrapper }>
          <span className={ styles.selectLabel }>Select { label }:</span>
          { height === 0 ? <AddIcon /> : <RemoveIcon /> }
        </div>
      </button>
      <AnimateHeight
        duration={ 500 }
        height={ height }
        className={ styles.accordion }
      >
        { data && data.map((item, index) => (
            <div key={ index } className={ optionClasses }>
              <CheckBox
                key={ item || item.name }
                label={ item.name ? item.name : item }
                reviewIcon={ reviewIcon }
                flag={ item.id }
                handleCheck={ (checked) => handleCheck(index, item, checked, item.id)}
                isActive={ checkedObj[index] }
              />
            </div>
          ))
        }
        { isCountryFilter &&
          <Clickable
            className={ styles.loadMoreButton }
            onClick={ expandFilter }
            transparent
          >
            { expandAllCountries ? 'Less countries...' : 'More countries...' }
          </Clickable>
        }
      </AnimateHeight>
    </>
  );
}

export default CheckBoxSection;
