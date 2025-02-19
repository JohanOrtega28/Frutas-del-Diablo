// componentes/NavbarInicio.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Ícono de perfil

const NavbarInicio = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable

    // Maneja el clic en el ícono de perfil
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Cierra el menú desplegable
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Navega a una ruta y cierra el menú
    const handleMenuClick = (route) => {
        if (route === '/cerrar-sesion') {
            // Manejar el cierre de sesión
            const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
            if (confirmLogout) {
                // Aquí puedes agregar lógica adicional si es necesario (por ejemplo, limpiar datos del contexto)
                navigate('/'); // Redirige al usuario a la página inicial
            }
        } else {
            // Para otras rutas, navegar normalmente
            navigate(route);
        }
        handleClose(); // Cerrar el menú después de navegar
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Título de la aplicación */}
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Frutas del Diablo
                </Typography>
                {/* Botones de la barra de navegación */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Botón para añadir fruta */}
                    <Button color="inherit" onClick={() => navigate('/add-fruit')}>
                        Añadir Fruta
                    </Button>
                    {/* Botón de perfil con menú desplegable */}
                    <IconButton
                        color="inherit"
                        aria-label="perfil"
                        onClick={handleProfileClick}
                    >
                        <AccountCircle />
                    </IconButton>
                    {/* Menú desplegable */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleMenuClick('/perfil')}>Perfil</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/configuracion')}>Configuración</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/cerrar-sesion')}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarInicio;