import React from 'react';
import classNames from 'classnames';
import { REGEX } from 'lib/regex';
import { INPUT_NAME } from 'lib/inputName';
import styles from './Input.module.scss';

const Input = ({ value, elementConfig, elementType, label, className, register, required, name, errors, onChangeHandler }) => {
  let inputEl = null;

  const inputClasses = classNames({
    [styles.errorInput]: errors && errors[name],
  }, className);

  switch(elementType) {
    case('input'):
      inputEl = register ? (
        <>
          <input
            className={ inputClasses }
            ref={ register(name === INPUT_NAME.avatar ? null : {
              required,
              maxLength: 30,
              minLength: 2,
              pattern: (name === INPUT_NAME.email) ? REGEX.email : ((name === INPUT_NAME.firstName || name === INPUT_NAME.lastName)) ? REGEX.onlyLetter : null
             })
            }
            name={ name }
            { ...elementConfig }
          />
          { errors[name]?.type === 'required' && <span className={ styles.error }>{`${ label } is required`}</span> }
          { errors[name]?.type === 'maxLength' && <span className={ styles.error }>{ label } is too long (maximum is 20 characters)</span> }
          { errors[name]?.type === 'minLength' && <span className={ styles.error }>{ label } is too short (minimum is 2 characters)</span> }
          { errors[name]?.type === 'pattern' && (name === INPUT_NAME.firstName || name === INPUT_NAME.lastName) &&
          <span className={ styles.error }>Only letters are allowed</span> }
          { errors[name]?.type === 'pattern' && name === INPUT_NAME.email &&
          <span className={ styles.error }>Please enter a valid email</span> }
        </>
      ) : (
        <input
          className={ className }
          name={ name }
          value={ value }
          onChange={ onChangeHandler }
          { ...elementConfig }
        />
      );
      break;
    case('textarea'):
      inputEl = (
        <textarea
          className={ styles.InputElement }
          value={ value }
          name={ name }
          { ...elementConfig }
        />
      )
      break;
    case('select'):
      inputEl = (
        <select
          className={ styles.selectElement }
          value={ value }
          ref={ register }
          name={ name }
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
      inputEl = <input value={ value } name={ name } ref={ register } className={ styles.InputElement } { ...elementConfig } />;
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
