import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavbarInicio = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/inicio')} // ✅ Ahora redirige a Inicio
                >
                    Frutas del Diablo
                </Typography>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" onClick={() => navigate('/add-fruit')}>
                        Añadir Fruta
                    </Button>
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>
                        <MenuItem onClick={() => navigate('/configuracion')}>Configuración</MenuItem>
                        <MenuItem onClick={() => navigate('/')}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarInicio;