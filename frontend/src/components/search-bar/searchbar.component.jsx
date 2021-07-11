// React components
import { Button, createTheme, ThemeProvider, Tooltip } from '@material-ui/core';
import { createRef, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// Style Components
import './style.css';

function notifyLength() {
  NotificationManager.error(
    'Search entries need to be longer than 2 characters...',
    'Too Short'
  );
}

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '4vw',
      },
    },
  },
});

const SearchBar = (props) => {
  const [searchVal, setSearchVal] = useState('');
  let inputVal = createRef();
  return (
    <div className="search-container">
      <div className="search">
        <Tooltip title={'Please enter search value longer than 2 characters'} arrow>
          <input
            ref={inputVal}
            className="input-search"
            type="text"
            placeholder="SEARCH AN ARTIST... "
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                if (!props.loadingInfo) props.loadingReset(true);
                if (e.target.value.length >= 3) {
                  props.history.push('/grid');
                  e.target.value = null;
                  props.requestArtistInfo(searchVal, props.history);
                } else {
                  notifyLength();
                  if (props.location.pathname === '/grid') {
                    props.history.push('/');
                  }
                }
              }
            }}
          />
        </Tooltip>
        <ThemeProvider theme={buttonTheme}>
          <Button
            onClick={(e) => {
              if (!props.loadingInfo) props.loadingReset(true);
              if (inputVal.current.value.length >= 3) {
                props.requestReset('');
                props.requestArtistInfo(inputVal.current.value, props.history);
                props.history.push('/grid');
                inputVal.current.value = null;
              } else {
                notifyLength();
                if (props.location.pathname === '/grid') {
                  props.history.push('/');
                }
              }
            }}
            style={{
              backgroundColor: '#E81C46',
              color: '#fff',
              fontSize: '1vw',
              height: '2vw',
              width: '4vw',
              maxWidth: '4vw',
              position: 'relative',
              borderRadius: '1vw',
            }}
            variant="contained"
          >
            FIND
          </Button>
        </ThemeProvider>
      </div>
      <NotificationContainer />
    </div>
  );
};
export default SearchBar;
