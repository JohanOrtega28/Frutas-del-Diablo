import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Register from './paginas/Register';
import AddFruit from './paginas/AddFruit';
import './App.css';

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

// Componente que decide cuándo mostrar la Navbar
const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/'; // Oculta Navbar en Home

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-fruit" element={<AddFruit />} />
            </Routes>
        </>
    );
};

export default App;
