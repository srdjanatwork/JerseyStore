import React from 'react';
import classNames from 'classnames';
import { REGEX } from 'lib/regex';
import { INPUT_NAME } from 'lib/inputName';
import styles from './Input.module.scss';

const Input = ({
  value,
  elementConfig,
  elementType = 'input',
  label,
  className,
  register,
  required,
  name,
  errors,
  onChangeHandler,
  isProfileError
}) => {
  let inputEl = null;

  const inputClasses = classNames({
    [styles.errorInput]: errors && errors[name],
  }, className);

  const errorClasses = classNames({
    [styles.error]: true,
    [styles.errorLeftAligned] : isProfileError
  }, className);

  const checkPattern = (name) => {
    switch(name) {
      case(INPUT_NAME.email):
        return REGEX.email;
      case(INPUT_NAME.firstName || INPUT_NAME.lastName):
        return REGEX.onlyLetter;
      case(INPUT_NAME.fullName):
        return REGEX.fullName;
      default:
       return null;
    }
  }

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
                pattern: checkPattern(name)
              })
            }
            name={ name }
            { ...elementConfig }
            onChange={ onChangeHandler }
          />
          { errors[name]?.type === 'required' && <span className={ styles.error }>{`${ label } is required`}</span> }
          { errors[name]?.type === 'maxLength' && <span className={ styles.error }>{ label } is too long (maximum is 20 characters)</span> }
          { errors[name]?.type === 'minLength' && <span className={ styles.error }>{ label } is too short (minimum is 2 characters)</span> }
          { errors[name]?.type === 'pattern' && (name === INPUT_NAME.firstName || name === INPUT_NAME.lastName) &&
          <span className={ errorClasses }>Only letters are allowed</span> }
          { errors[name]?.type === 'pattern' && name === INPUT_NAME.email &&
          <span className={ errorClasses }>Please enter a valid email</span> }
          { errors[name]?.type === 'pattern' && name === INPUT_NAME.fullName &&
          <span className={ errorClasses }>Please enter a valid full name</span> }
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
          className={ className }
          value={ value }
          ref={ register }
          name={ name }
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
