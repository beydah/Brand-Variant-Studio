// #region Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './services/localization';
// #endregion

// #region Application Build
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
// #endregion
