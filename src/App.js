import React from 'react';
import './App.css';
import Header from './components/header/Header';
import ListNotes from './components/listNotes/ListNotes';
import PopUpNote from './components/popUpNote/PopUpNote';

/**
 * 
 * Types of notes:
 *  - square: shows titles and content (default)
 *  - titles: only shows titles and details (date, characters)
 *  - all
 */

function App() {
  const [type, setType] = React.useState('default');
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState(null);

  const hyphenText = (text, chars) => {
    let counter = 0;

    return text ? 
      text.split('').map((element) => {
        counter = element === ' ' ? 0 : counter + 1;
        return counter % chars === 0 && counter !== 0 ? element + '-' : element;
      }).join('')
      : '(none)';
  };

  const allTypes = [
    'square',
    'titles',
    'all',
  ]

  return (
    <div className="app">
      <Header setType={setType} allTypes={allTypes} type={type} />
      <ListNotes type={type} setSelectedNote={setSelectedNote} setShowPopUp={setShowPopUp} hyphenText={hyphenText} />
      <PopUpNote showPopUp={showPopUp} setShowPopUp={setShowPopUp} selectedNote={selectedNote} hyphenText={hyphenText} />
            
    </div>
  );
}

export default App;
