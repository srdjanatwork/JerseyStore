import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Clickable from 'components/shared/Clickable';
import Input from 'components/shared/Input';
import styles from './ProfileInfoControl.module.scss';

const ProfileInfoControl = ({ info, infoLabel }) => {
  const [isShownInput, setIsShown] = useState(false);
  const { register, errors, formState, getValues } = useForm({ mode: 'onChange' });
  const { dirty } = formState;

  const editHandler = () => {
    setIsShown(true);
    console.log('EDIT')
  }

  const cancelHandler = () => {
    setIsShown(false);
    console.log('CANCEL')
  }

  const onChangeHandler = () => {
    console.log('ON CHANGE');
  }

  const saveHandler = () => {
    setIsShown(false);
    console.log('SAVE');
  }

  return (
    <div className={ styles.test }>
      <div className={ styles.displayInfo }>
        { info &&
          <h1 className={ styles.info }>
            { infoLabel }: <span className={ styles.bold }>{ info }</span>
          </h1> }
        <div className={ styles.buttonWrapper }>
          <Clickable
            tag='button'
            onClick={ editHandler }
            className={ styles.editButton }
            transparent
          >
            Edit
          </Clickable>
          { isShownInput &&
            <div className={ styles.editCancelWrapper }>
              <Clickable
                tag='button'
                onClick={ saveHandler }
                className={ styles.editButton }
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
        />
      }
    </div>
  );
}

export default ProfileInfoControl;
