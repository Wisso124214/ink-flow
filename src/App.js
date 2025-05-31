import React from 'react';
import './App.css';
import Header from './components/header/Header';
import ListNotes from './components/listNotes/ListNotes';

/**
 * 
 * Types of notes:
 *  - square: shows titles and content (default)
 *  - titles: only shows titles and details (date, characters)
 *  - all
 */

function App() {
  const [type, setType] = React.useState('default');
  const allTypes = {
    default: 'square',
    titles: 'titles',
    all: 'all',
  }

  return (
    <div className="app">
      <Header setType={setType} allTypes={allTypes} type={type} />
      <ListNotes type={type} />
    </div>
  );
}

export default App;
