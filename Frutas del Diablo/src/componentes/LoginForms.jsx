import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // 🔥 Importamos Firebase Auth
import { signInWithPopup, signOut } from "firebase/auth"; // 🔥 Importamos funciones de Firebase
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
            navigate('/inicio');
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    // 🔥 Iniciar sesión con Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("✅ Usuario autenticado:", user);

            // Guardamos el usuario en localStorage
            localStorage.setItem("user", JSON.stringify({ email: user.email, name: user.displayName }));

            alert(`Bienvenido, ${user.displayName}`);
            navigate('/inicio'); // Redirigir a la página de inicio
        } catch (error) {
            console.error("❌ Error en autenticación con Google:", error);
            alert("Error al iniciar sesión con Google");
        }
    };

    return (
        <div className="login-container">
            <div className="login-image-container" style={{ backgroundImage: `url(${logo})` }} />
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

                {/* 🔥 Botón de inicio de sesión con Google */}
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleGoogleLogin}
                    style={{ marginTop: '10px', backgroundColor: '#db4437', color: 'white' }}
                >
                    Iniciar Sesión con Google
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;
