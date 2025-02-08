import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
            alert("Inicio de sesión exitoso");
            navigate('/inicio'); // Redirigir a Inicio.jsx
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Correo Electrónico" 
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar Sesión
                </Button>
            </form>
        </Container>
    );
};

export default LoginForm;
