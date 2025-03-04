import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate(); // Hook para redirigir

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Guardar en localStorage
        const userData = { email: form.email, password: form.password };
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Registro exitoso. Ahora serás redirigido al inicio de sesión.");
        
        // Redirigir automáticamente a la página de login
        navigate('/login');
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>Registro</Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    fullWidth
                    margin="normal"
                    required
                    value={form.email}
                    onChange={handleChange}
                />
                <TextField 
                    label="Contraseña"
                    type="password"
                    name="password"
                    fullWidth
                    margin="normal"
                    required
                    value={form.password}
                    onChange={handleChange}
                />
                <TextField 
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    margin="normal"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Registrarse
                </Button>
            </form>
        </Container>
    );
};

export default RegisterForm;
