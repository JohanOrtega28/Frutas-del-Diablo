import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar'; // RUTA CORRECTA
import Login from './paginas/Login'; // RUTA CORRECTA
import Register from './paginas/Register'; // RUTA CORRECTA
import AddFruit from './paginas/AddFruit'; // Agregar página para registrar frutas
import './App.css';


const Home = () => <h1>Bienvenido a Frutas del Diablo</h1>;

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-fruit" element={<AddFruit />} /> {/* Nueva ruta para agregar frutas */}
            </Routes>
        </Router>
    );
};

export default App;
