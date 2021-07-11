import axios from 'axios';
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import GridPage from './pages/grid-page/grid.component';
import HomePage from './pages/home-page/home.component';

// Use local storage to save search terms
if (!localStorage.getItem('search-results')) {
  localStorage.setItem('search-results', '');
}

// Check length of search entry
function notifyLength() {
  NotificationManager.error(
    'Could not find the artist you are looking for please try again',
    'ERROR'
  );
}

function App() {
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(true);

  // Artists requests to BFF API
  const requestArtist = async (searchValue, history) => {
    let result = await axios.get('/api/server/' + searchValue);
    if (result.data === 'error' || result.data.total === 0) {
      history.push('/');
      notifyLength();
    }
    setRequest(result.data);
    setLoading(false);
  };

  return (
    <div className="App">
      <Route
        render={(props) => (
          <TransitionGroup>
            <CSSTransition key={props.location.key} classNames="fade" timeout={300}>
              <Switch location={props.location}>
                <Route
                  requestArtistInfo={requestArtist}
                  exact
                  path="/"
                  render={() => (
                    <HomePage
                      loadingReset={setLoading}
                      requestReset={setRequest}
                      requestArtistInfo={requestArtist}
                      {...props}
                    />
                  )}
                />
                <Route
                  requestArtistInfo={requestArtist}
                  path="/grid"
                  render={() => (
                    <GridPage
                      loadingReset={setLoading}
                      requestReset={setRequest}
                      loadingData={loading}
                      requestArtist={request}
                      requestArtistInfo={requestArtist}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <NotificationContainer />
    </div>
  );
}

export default App;
