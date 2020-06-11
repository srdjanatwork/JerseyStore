import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './ProfileInfoControl.module.scss';

const ProfileInfoControl = ({ info, infoLabel, sendUpdatedInfo, setIsShownHandler }) => {
  const [isShownInput, setIsShown] = useState(false);
  const [disableSave, setDisableSave] = useState();
  const { register, errors, getValues } = useForm({ mode: 'onChange' });
  const [inputValue, setInputValue] = useState('');

  const editHandler = () => {
    setIsShown(true);
    if (!getValues(infoLabel)) {
      setDisableSave(true);
      setIsShownHandler(true);
    }
  }

  const cancelHandler = () => {
    setIsShown(false);
  }

  const onChangeHandler = (event) => {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }

    setIsShownHandler(isShownInput);
  }

  const saveHandler = () => {
    setInputValue(getValues(infoLabel));
    sendUpdatedInfo(getValues(infoLabel), infoLabel);
    setIsShown(false);
  }

  return (
    <div className={ styles.test }>
      <div className={ styles.displayInfo }>
        { info &&
          <h1 className={ styles.info }>
            <span className={ styles.label }>{ infoLabel }</span> : <span className={ styles.bold }>{ inputValue !== '' ? inputValue : info }</span>
          </h1> }
        <div className={ styles.buttonWrapper }>
          { !isShownInput &&
          <Clickable
            tag='button'
            onClick={ editHandler }
            className={ styles.editButton }
            transparent
          >
            Edit
          </Clickable> }
          { isShownInput &&
            <div className={ styles.editCancelWrapper }>
              <Clickable
                tag='button'
                onClick={ saveHandler }
                className={ styles.editButton }
                disabled={ disableSave }
                transparent
              >
                Save
              </Clickable>
              <Clickable
                tag='button'
                onClick={ cancelHandler }
                className={ styles.editButton }
                transparent
              >
                Cancel
              </Clickable>
            </div>
          }
        </div>
      </div>
      { isShownInput &&
        <Input
          elementType='input'
          name={ infoLabel }
          className={ styles.editInput }
          register={ register }
          errors={ errors }
          onChangeHandler={ onChangeHandler }
          isProfileError
        />
      }
    </div>
  );
}

export default ProfileInfoControl;
