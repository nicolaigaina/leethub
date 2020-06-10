import React, { useState, useEffect } from 'react';
import Routes from '../Routes';
import './App.css';
import Navigation from '../Navigation';
import { Auth } from "aws-amplify";
import { AppContext } from '../../libs/appContext';

const App: React.FC = () => {
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating ?
      <div className="App container">
        <Navigation {...{ isAuthenticated, userHasAuthenticated }} />
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div> : null
  );
}

export default App;
