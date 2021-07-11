import React from 'react';
import './style.css';
import logo from './wyzetalk-header.png';

const HeaderLogo = () => (
  <div className="logo-container">
    <a href={'https://www.wyzetalk.com/'}>
      <img className="logo" src={logo} alt="wyzetalk-logo" />
    </a>
  </div>
);

export default HeaderLogo;
