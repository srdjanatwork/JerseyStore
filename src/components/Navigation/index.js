import React from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import styles from './Navigation.module.scss';

const iconStyles = {
  marginLeft: 10,
  marginRight: 10
}

const Navigation = () => {
  return (
    <div className={ styles.navigation }>
      <div>Some content</div>
      <div>Logo</div>
      <div className={ styles.iconsWrapper }>
        <SearchIcon fontSize="large" />
        <AccountBoxIcon style={ iconStyles } fontSize="large" />
        <ShoppingCartIcon fontSize="large" />
      </div>
    </div>
  );
}

export default Navigation;
