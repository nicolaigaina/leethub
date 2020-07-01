import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Routes from '../../routes';
import Container from './styled';
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
        // TODO: fix by adding toast notifications
        // eslint-disable-next-line
        alert(e);
      }
    }

    setIsAuthenticating(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return !isAuthenticating ? (
    <Container>
      <Navigation {...{ isAuthenticated, userHasAuthenticated }} />
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </Container>
  ) : null;
};

export default App;
