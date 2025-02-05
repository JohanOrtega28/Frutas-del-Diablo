import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Frutas del Diablo
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Registro</Button>
                <Button color="inherit" component={Link} to="/add-fruit">Añadir Fruta</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
