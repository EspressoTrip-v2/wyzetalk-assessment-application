import { Button, createTheme, ThemeProvider } from '@material-ui/core';
import SearchBar from '../search-bar/searchbar.component';
import logoB from './d-logo.png';
import './style.css';
import logoA from './w-logo.png';

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '4vw',
      },
    },
  },
});

const Header = (props) => {
  return (
    <div className="header">
      <a href={'https://www.wyzetalk.com/'}>
        <img
          className="logA"
          style={{ width: '2vw', marginLeft: '1vw' }}
          src={logoA}
          alt="small logo"
        />
      </a>
      <div className="search-container">
        <ThemeProvider theme={buttonTheme}>
          <Button
            onClick={() => {
              props.history.push('/');
              props.requestReset('');
              props.loadingReset(true);
            }}
            style={{
              backgroundColor: '#E81C46',
              color: '#fff',
              fontSize: '1vw',
              height: '2vw',
              width: '4vw',
              maxWidth: '4vw',
              borderRadius: '1vw',
            }}
            variant="contained"
          >
            Home
          </Button>
        </ThemeProvider>
        <SearchBar {...props} />
      </div>
      <a href={'https://www.deezer.com/'}>
        <img
          className="logoB"
          style={{ width: '3vw', marginRight: '1vw' }}
          src={logoB}
          alt="small logo"
        />
      </a>
    </div>
  );
};

export default Header;
