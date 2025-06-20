import React from 'react';
import App from './App';

export const AppContext = React.createContext();

function AppContextProvider() {
  const [currentPage, setCurrentPage] = React.useState('default');
  const [type, setType] = React.useState('default');
  const [loading, setLoading] = React.useState(false);

  let context = {
    currentPage,
    setCurrentPage,
    type,
    setType,
    loading,
    setLoading,
  }

  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
}

export default AppContextProvider;
