import React from 'react';
import App from './App';

export const AppContext = React.createContext();

function AppContextProvider() {
  const [currentPage, setCurrentPage] = React.useState('default');
  const [type, setType] = React.useState('default');

  let context = {
    currentPage,
    setCurrentPage,
    type,
    setType,
  }

  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
}

export default AppContextProvider;
