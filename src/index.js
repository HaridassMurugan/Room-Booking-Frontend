import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';
import { OwnerAuthContextProvider } from './context/OwnerAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OwnerAuthContextProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </OwnerAuthContextProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

