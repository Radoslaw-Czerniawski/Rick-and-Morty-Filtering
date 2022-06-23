import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { RaMCharactersProvider } from './Context/RaMCharacters/RaMCharactersContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RaMCharactersProvider>
            <App />
        </RaMCharactersProvider>
    </React.StrictMode>
);
