import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);

    // Verifica si estás en una página donde NO debe aparecer el icono de perfil
    const isListaFrutas = location.pathname.startsWith('/lista-frutas');
    const isRegistro = location.pathname === '/register';

    // Maneja el clic en el ícono de perfil
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Cierra el menú desplegable
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Frutas del Diablo
                </Typography>

                {/* Mostrar icono de perfil SOLO si el usuario ha iniciado sesión y NO está en registro */}
                {(isListaFrutas || user) && !isRegistro ? (
                    <div>
                        <IconButton color="inherit" onClick={handleProfileClick}>
                            <AccountCircle />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={() => { navigate('/perfil'); handleClose(); }}>Perfil</MenuItem>
                            <MenuItem onClick={() => { navigate('/configuracion'); handleClose(); }}>Configuración</MenuItem>
                            <MenuItem onClick={() => { localStorage.removeItem("user"); navigate('/'); handleClose(); }}>
                                Cerrar sesión
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (
                    // Mostrar los botones de inicio de sesión y registro si no está en lista de frutas
                    !isRegistro && (
                        <div>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Iniciar Sesión
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Registrarse
                            </Button>
                        </div>
                    )
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
