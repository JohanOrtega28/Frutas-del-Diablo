import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Iniciando sesión con:", email, password);
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>Iniciar Sesión</Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Correo electrónico"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Ingresar</Button>
            </form>
        </Container>
    );
};

export default LoginForm;
