import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavbarInicio = () => {
    const navigate = useNavigate();

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

                <Button color="inherit" onClick={() => navigate('/add-fruit')}>Añadir Fruta</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarInicio;
