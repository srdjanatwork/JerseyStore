import React from 'react';

import styles from './Input.module.scss';

const Input = ({ value, elementConfig, onChangeHandler, elementType, label, className }) => {
  let inputEl = null;
  switch(elementType) {
    case('input'):
      inputEl = (
        <input
          className={ className }
          value={ value }
          onChange={ onChangeHandler }
          { ...elementConfig }
        />
      )
      break;
    case('textarea'):
      inputEl = (
        <textarea
          className={ styles.InputElement }
          value={ value }
          onChange={ onChangeHandler }
          { ...elementConfig }
        />
      )
      break;
    case('select'):
      inputEl = (
        <select
          className={ styles.InputElement }
          value={ value }
          onChange={ onChangeHandler }
        >
          { elementConfig.options.map(option => {
            return (
              <option
                key={ option.value }
                value={ option.value }
              >
                { option.displayValue }
              </option>
            );
          }) }
        </select>
      )
      break;
    default:
      inputEl = <input className={ styles.InputElement } { ...elementConfig } value={ value }  />;
      break;
  }

  return (
    <>
      { label && <label className={ styles.Label }>{ label }</label> }
      { inputEl }
    </>
  );
}

export default Input;
