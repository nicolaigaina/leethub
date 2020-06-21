import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Routes from '../Routes';
import './App.css';
import Navigation from '../Navigation';
import { AppContext } from '../../libs/appContext';

const App: React.FC = () => {
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        // eslint-disable-next-line
        // TODO: fix by adding toast notifications
        alert(e);
      }
    }

    setIsAuthenticating(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return !isAuthenticating ? (
    <div className="App container">
      <Navigation {...{ isAuthenticated, userHasAuthenticated }} />
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  ) : null;
};

export default App;
