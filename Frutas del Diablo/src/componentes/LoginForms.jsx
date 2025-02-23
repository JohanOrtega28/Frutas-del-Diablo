import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../estilos/global.css'; // Importa el archivo CSS global

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === form.email && storedUser.password === form.password) {
      alert('¡Inicio de sesión exitoso!');
      navigate('/inicio'); // Redirigir a Inicio.jsx
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography
          variant="h4"
          className="one-piece-font"
          sx={{
            color: '#ffcc00',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 4px #000',
          }}
        >
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit} className="one-piece-font">
          <TextField
            label="Correo Electrónico"
            name="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffcc00',
                },
                '&:hover fieldset': {
                  borderColor: '#ffdd40',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffcc00',
                },
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffcc00',
                },
                '&:hover fieldset': {
                  borderColor: '#ffdd40',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffcc00',
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="one-piece-font"
            sx={{
              marginTop: '20px',
              padding: '12px',
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #ffcc00 30%, #ffdd40 90%)',
              color: '#000',
              '&:hover': {
                background: 'linear-gradient(45deg, #ffdd40 30%, #ffcc00 90%)',
              },
            }}
          >
            INICIAR SESIÓN
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
