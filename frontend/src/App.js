import axios from 'axios';
import { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uniqid from 'uniqid';
import './App.css';
import GridPage from './pages/grid-page/grid.component';
import HomePage from './pages/home-page/home.component';

// Notification for short search
function notifyError(message, title) {
  NotificationManager.error(message, title);
}

// Check if local storage exists
if (!localStorage.getItem('searched')) {
  localStorage.setItem('searched', '[]');
}

// Convert local storage to usable object
const getLocal = () => {
  return JSON.parse(localStorage.getItem('searched'));
};

function App() {
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(true);
  const [serverType, setServerType] = useState(true);

  // Check last update for searches on MongoDB (Granularity daily)
  useEffect(() => {
    const dateUpdater = async () => {
      let date = new Date(),
        asDate = new Date(date.getFullYear(), date.getMonth(), date.getDay()),
        response = await axios.get('/api/mongoose/date'),
        resDate = new Date(response.data.date),
        localStore = getLocal();
      if (localStore.length > 0 && asDate - resDate > 0) {
        axios.put('/api/mongoose/update', getLocal()); //TODO: fix
      }
    };
    dateUpdater();
  }, []);

  // Requests for searches to BFF layer
  const requestArtist = async (searchValue, history) => {
    let existingKey = await axios.get('/api/mongoose/key-exists/' + searchValue);
    if (existingKey.data) {
      setServerType(false);
      let response = await axios.get('/api/mongoose/get-search/' + searchValue);
      if (response.data === 'error') {
        history.push('/');
        notifyError(
          'There seems to be a problem with the server, please try again later',
          'SERVER ERROR'
        );
      } else if (response.data.total === 0) {
        history.push('/');
        notifyError('There does not seem to be a good match for your search', 'NOT FOUND');
      }
      setRequest(response.data);
      setLoading(false);
    } else {
      setServerType(true);
      let response = await axios.get('/api/server/' + searchValue);
      if (response.data === 'error') {
        history.push('/');
        notifyError(
          'There seems to be a problem with the server, please try again later',
          'SERVER ERROR'
        );
      } else if (response.data.total === 0) {
        history.push('/');
        notifyError('There does not seem to be a good match for your search', 'NOT FOUND');
      }
      setRequest(response.data);
      setLoading(false);
      axios.post('/api/mongoose/create', { searchTerm: searchValue, ...response.data });
    }
  };
  return (
    <div className="App">
      <Route
        render={(props) => (
          <TransitionGroup>
            <CSSTransition key={uniqid.process()} classNames="fade" timeout={300}>
              <Switch location={props.location}>
                <Route
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
                  path="/grid"
                  render={() => (
                    <GridPage
                      serverType={serverType}
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
