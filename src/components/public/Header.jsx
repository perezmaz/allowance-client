import React from 'react';
import Logo from '../../assets/img/log_3.svg';

const Header = () => (
  <header>
    <div className="m0 p0 mt-5 text-center">
      <img
        src={Logo}
        alt="Logo"
        className="logo"
      />
    </div>
  </header>
);

export default Header;
