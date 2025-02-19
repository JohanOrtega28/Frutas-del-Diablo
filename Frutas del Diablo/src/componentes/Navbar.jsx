// componentes/Navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado local para autenticación

    // Función para simular inicio de sesión
    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/inicio');
    };

    // Función para simular cierre de sesión con confirmación
    const handleLogout = () => {
        const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
        if (confirmLogout) {
            setIsAuthenticated(false); // Actualiza el estado de autenticación
            navigate('/'); // Redirige al usuario a la página inicial
        }
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Título de la aplicación */}
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/inicio')}
                >
                    <span>Frutas del Diablo</span>
                </Typography>

                {/* Botones condicionales */}
                <div>
                    {location.pathname === '/editar-perfil' ? (
                        // Botón para volver a Configuración en /editar-perfil
                        <Button color="inherit" onClick={() => navigate('/configuracion')}>
                            Volver a Configuración
                        </Button>
                    ) : ['/add-fruit', '/perfil', '/configuracion'].includes(location.pathname) ? (
                        // Botón "Volver al Inicio" en páginas específicas
                        <Button color="inherit" onClick={() => navigate('/inicio')}>
                            Volver al Inicio
                        </Button>
                    ) : isAuthenticated ? (
                        // Botones para usuarios autenticados
                        <>
                            <Button color="inherit" onClick={() => navigate('/add-fruit')}>
                                Añadir Fruta
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/perfil')}>
                                Perfil
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        // Botones para usuarios no autenticados
                        <>
                            <Button color="inherit" onClick={handleLogin}>
                                Iniciar Sesión
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Registrarse
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;