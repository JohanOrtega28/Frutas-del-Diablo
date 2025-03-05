import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../estilos/registerforms.css'; // Importamos los estilos
import logo from '../assets/tripulacion.webp'; // Reemplázalo con la imagen deseada


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
        <div className="register-container">
            {/* Contenedor de la imagen */}
            <div 
                className="register-image-container"
                style={{ backgroundImage: `url(${logo})` }} 
            />
            <div className="register-box">
                <Typography className="register-title" variant="h4" align="center" gutterBottom>
                    Registro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="register-input"
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
                        className="register-input"
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
                        className="register-input"
                        label="Confirmar Contraseña"
                        type="password"
                        name="confirmPassword"
                        fullWidth
                        margin="normal"
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
    
    
};

export default RegisterForm;
