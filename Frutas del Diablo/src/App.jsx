// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Register from './paginas/Register';
import AddFruit from './paginas/AddFruit';
import Inicio from './paginas/Inicio';
import Perfil from './paginas/Perfil';
import EditarPerfil from './paginas/EditarPerfil';
import Configuracion from './paginas/Configuracion';
import { FruitProvider } from './context/FruitContext'; // Importa el contexto de frutas
import { UserProvider } from './context/UserContext'; // Importa el contexto de usuario
import './App.css';

const App = () => {
    return (
        <UserProvider> {/* Envuelve la aplicación con el contexto de usuario */}
            <FruitProvider> {/* Envuelve la aplicación con el contexto de frutas */}
                <Router>
                    <AppContent />
                </Router>
            </FruitProvider>
        </UserProvider>
    );
};

const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/' && location.pathname !== '/inicio';
    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} /> {/* Página principal */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-fruit" element={<AddFruit />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar-perfil" element={<EditarPerfil />} />
                <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
        </>
    );
};

export default App;