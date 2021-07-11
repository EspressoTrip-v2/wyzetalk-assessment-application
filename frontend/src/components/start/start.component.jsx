// React components

import HeaderLogo from '../logo/logo.component';
import SearchBar from '../search-bar/searchbar.component';
import './style.css';

const Start = (props) => {
  return (
    <div className="start-container">
      <HeaderLogo />
      <SearchBar {...props} />
    </div>
  );
};

export default Start;
