import React from 'react';
import Routes from '../Routes';
import './App.css';
import Navigation from '../Navigation';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
