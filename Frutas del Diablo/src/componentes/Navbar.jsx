import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Se envuelve en un <span> para evitar clics en el área vacía */}
                <Typography 
                    variant="h6" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <span>Frutas del Diablo</span>
                </Typography>

                <div>
                    <Button color="inherit" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>Registrarse</Button>
                    <Button color="inherit" onClick={() => navigate('/add-fruit')}>Añadir Fruta</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
