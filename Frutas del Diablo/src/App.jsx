// src/App.jsx
import React, { useEffect } from 'react';
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
import { FruitProvider } from './context/FruitContext';
import { UserProvider } from './context/UserContext';
import { db } from "./firebase"; // Importar Firestore
import { collection, getDocs } from "firebase/firestore";
import './App.css';
import VerFruta from './paginas/VerFruta';
import ListaFrutas from './componentes/ListaFrutas';

const App = () => {
    return (
        <UserProvider>
            <FruitProvider>
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

    useEffect(() => {
        // Función para probar conexión con Firestore
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "test")); // Colección "test"
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data()); // Muestra los datos en la consola
                });
            } catch (error) {
                console.error("Error al obtener datos de Firebase:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-fruit" element={<AddFruit />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar-perfil" element={<EditarPerfil />} />
                <Route path="/configuracion" element={<Configuracion />} />
                <Route path="/lista-frutas" element={<ListaFrutas />} />
                <Route path="/fruta/:id" element={<VerFruta />} />
            </Routes>
        </>
    );
};

export default App;
