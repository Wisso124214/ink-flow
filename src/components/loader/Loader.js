import React from 'react';
import './Loader.css';
import { AppContext } from '@src/AppContext';

export default function Loader({ className = '' }) {
  let consumeContext = React.useContext(AppContext);
  const { loading } = consumeContext;

  return (
    loading && 
    <div className={`loader-overlay ${className}`}>
      <div className="loader-spinner" />
    </div>
  );
}
