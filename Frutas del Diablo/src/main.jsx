import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';
import '../src/estilos/global';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
