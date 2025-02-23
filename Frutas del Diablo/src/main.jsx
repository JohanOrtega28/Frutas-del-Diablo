

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Asegúrate de que la ruta sea correcta
import './estilos/global.css'; // Importa el archivo CSS global

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
