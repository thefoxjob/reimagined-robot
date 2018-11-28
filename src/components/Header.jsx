import React from 'react';
import { Link } from 'react-router-dom';

import Wishlist from './Wishlist';


const Header = () => (
  <header className="component header">
    <div className="row h-100 align-items-center">
      <div className="col-1" />
      <div className="col-10">
        <div className="text-center">
          <Link className="logo" to="/">
            <img src="https://static.gilt.com/5e4efdb6824922151e4790e0c84b0ac3cb11820e/img/gilt_logo.svg" alt="GILT Logo" />
          </Link>
        </div>
      </div>
      <div className="col-1">
        <Wishlist />
      </div>
    </div>
  </header>
);

export default Header;
