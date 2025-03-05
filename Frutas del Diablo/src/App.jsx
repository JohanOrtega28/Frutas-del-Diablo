import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './paginas/Home';
import EditarFruta from './paginas/EditarFruta';
import Login from './paginas/Login';
import Register from './paginas/Register';
import AddFruit from './paginas/AddFruit';
import Inicio from './paginas/Inicio';
import Perfil from './paginas/Perfil';
import EditarPerfil from './paginas/EditarPerfil';
import Configuracion from './paginas/Configuracion';
import { FruitProvider } from './context/FruitContext';
import { UserProvider } from './context/UserContext';
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import './App.css';
import VerFruta from './paginas/VerFruta';
import ListaFrutas from './componentes/ListaFrutas';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <UserProvider>
            <FruitProvider>
                <Router>
                    <AppContent searchQuery={searchQuery} onSearch={handleSearch} />
                </Router>
            </FruitProvider>
        </UserProvider>
    );
};

const AppContent = ({ searchQuery, onSearch }) => {
    const location = useLocation();

    // 🚀 Corrección: ahora el Navbar también se oculta en `/`
    const hideNavbar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/inicio";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "test"));
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            } catch (error) {
                console.error("Error al obtener datos de Firebase:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {!hideNavbar && <Navbar onSearch={onSearch} />} {/* Navbar ahora también se oculta en Home */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-fruit" element={<AddFruit />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar-fruta/:id" element={<EditarFruta />}/>
                <Route path="/editar-perfil" element={<EditarPerfil />} />
                <Route path="/configuracion" element={<Configuracion />} />
                <Route path="/lista-frutas" element={<ListaFrutas searchQuery={searchQuery} />} />
                <Route path="/fruta/:id" element={<VerFruta />} />
            </Routes>
        </>
    );
};

export default App;
