import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating'

import styles from './Team.module.scss';

const Team = ({ team }) => {
  // console.log('data', team);
  return (
    <div className={ styles.team }>
      <Link className={ styles.link } to="/">
        <div className={ styles.imgWrapper }>
          <img className={ styles.img } src={ team.homeKit } alt='' />
          <span className={ styles.quickView }>Quick view</span>
        </div>
        <Rating rating={ team.rating } />
        <div className={ styles.titleWrapper }>
          <span>{ team.name }</span>
          <img className={ styles.icon } src={ team.logo } alt='' />
        </div>
        <span>{ team.text }</span>
        { team.new &&
          <div className={ styles.new }>
            <span>New</span>
          </div>
        }
      </Link>
      <div>
        <button className={ styles.button }>
        <span className={ styles.purchase }>Purchase:</span>
        <span className={ team.discount ? styles.oldPrice : styles.price }>
          { team.discount ? <del className={ styles.oldPrice }>{ team.price }€</del> : `${team.price}€` }
        </span>
        {
          team.discount &&
          <span className={ styles.discount }>
            { `${team.discount}€` }
          </span>
        }
        </button>
      </div>
    </div>
  );
}

export default Team;
