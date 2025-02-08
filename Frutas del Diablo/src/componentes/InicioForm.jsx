import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InicioForm = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // Elimina el usuario de localStorage
        navigate('/login'); // Redirige a login
    };

    return (
        <Container maxWidth="md" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center'
        }}>
            <Typography variant="h3" gutterBottom>
                ¡Bienvenido a Frutas del Diablo!
            </Typography>
            <Typography variant="h6">
                Has iniciado sesión correctamente. Aquí podrás administrar tus frutas del diablo.
            </Typography>

            <Button 
                variant="contained" 
                color="secondary" 
                style={{ marginTop: '20px' }}
                onClick={handleLogout}
            >
                Cerrar Sesión
            </Button>
        </Container>
    );
};

export default InicioForm;
