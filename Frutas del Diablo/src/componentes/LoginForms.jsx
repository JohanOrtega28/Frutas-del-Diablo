import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../estilos/loginforms.css'; 
import logo from '../assets/inicio.jpeg';

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
        <div className="login-container">
            <div 
                className="login-image-container"
                style={{ backgroundImage: `url(${logo})` }} 
            />
            <div className="login-box">
                <Typography className="login-title" variant="h4" align="center" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="login-input"
                        label="Correo Electrónico"
                        name="email"
                        fullWidth
                        margin="normal"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className="login-input"
                        label="Contraseña"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        required
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
