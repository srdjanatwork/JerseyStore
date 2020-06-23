import React, { useState, useEffect } from 'react';
import { usePrevious } from 'utils/useRef';
import { buttonType } from 'lib/buttonType';
import Input from 'components/shared/Input';
import styles from './CounterInput.module.scss';

const MIN_VALUE = 1;
const MAX_VALUE = 10;

const CounterInput = ({ setCounter, jerseyCount }) => {
  const [count, setCountState] = useState(jerseyCount ? jerseyCount : 1);
  const prevCount = usePrevious(count);

  const changeCount = (type) => {
    if (type === buttonType.decrease) {
      setCountState(count => count - 1);

      if (count < (MIN_VALUE + 1)) {
        setCountState(MIN_VALUE);
        setCounter(MIN_VALUE);
      }
    }

    if (type === buttonType.increase) {
      setCountState(count => count + 1);

      if (count > (MAX_VALUE - 1)) {
        setCountState(MAX_VALUE);
        setCounter(MAX_VALUE);
      }
    }
  }

  useEffect(() => {
    if (prevCount !== count) {
      setCounter(count);
    }
  }, [count, prevCount, setCounter])

  return (
     <div className={ styles.quantityWrapper }>
      <button className={ styles.quantityButton } onClick={ () => changeCount(buttonType.decrease) }>-</button>
      <Input
        elementType='input'
        elementConfig={{
          'type': 'number',
          'min': '1',
          'max': '10'
        }}
        value={ jerseyCount ? jerseyCount : count }
        className={ styles.counterInput }
        onChangeHandler={ () => {} }
      />
      <button className={ styles.quantityButton } onClick={ () => changeCount(buttonType.increase) }>+</button>
    </div>
  );
}

export default CounterInput;
