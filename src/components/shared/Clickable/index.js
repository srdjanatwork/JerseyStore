import React from 'react';
import classNames from 'classnames';
import styles from './Clickable.module.scss';

const Clickable = ({ className, onClick, to, children, disabled, tag: Tag, transparent }) => {

  const clickableClasses = classNames({
    [styles.clickable]: true,
    [styles.clickableDisabled]: disabled,
    [styles.transparent]: transparent,
  }, className);

  return (
    <Tag
      to={ to }
      onClick={ onClick }
      className={ clickableClasses }
    >
      { children }
    </Tag>
  );
}

export default Clickable;
