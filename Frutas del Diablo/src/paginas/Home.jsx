import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>Bienvenido a Frutas del Diablo</Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Administra y descubre información sobre las Frutas del Diablo
            </Typography>
            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/register')}
                >
                    Registrarse
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
