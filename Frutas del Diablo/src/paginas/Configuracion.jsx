import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../componentes/AuthLayout';

const Configuracion = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas abandonar el barco?');
    if (confirmLogout) {
      navigate('/'); // Redirige al usuario a la página inicial
    }
  };

  return (
    <AuthLayout
      title="Configuracion del Pirata"
      titleStyle={{
        fontFamily: '"ONE PIECE", sans-serif',
        fontSize: '2.5rem',
        color: '#ffcc00',
        textTransform: 'uppercase',
        WebkitTextStroke: '0.8px black', // Borde negro alrededor del texto
      }}
    >
      <List
        sx={{
          fontFamily: '"ONE PIECE", sans-serif', // Aplica la fuente ONE PIECE globalmente
        }}
      >
        <ListItem
          button
          onClick={() => navigate('/editar-perfil')}
          sx={{
            '& .MuiListItemText-primary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '2rem',
              color: '#ffcc00',
              textTransform: 'uppercase',
              WebkitTextStroke: '0.5px black', // Borde negro alrededor del texto
            },
            '& .MuiListItemText-secondary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '1.4rem',
              color: '#000000',
            },
          }}
        >
          <ListItemText
            primary="Editar Perfil"
            secondary="Cambia tu nombre, correo o contraseña"
          />
        </ListItem>
        <Divider />

        <ListItem
          button
          onClick={() => navigate('/reportar-problema')}
          sx={{
            '& .MuiListItemText-primary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '2rem',
              color: '#ffcc00',
              textTransform: 'uppercase',
              WebkitTextStroke: '0.5px black', // Borde negro alrededor del texto
            },
            '& .MuiListItemText-secondary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '1.4rem',
              color: '#000000',
            },
          }}
        >
          <ListItemText
            primary="Reportar Problema"
            secondary="Informa sobre errores o información incorrecta"
          />
        </ListItem>
        <Divider />

        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '& .MuiListItemText-primary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '2rem',
              color: '#ffcc00',
              textTransform: 'uppercase',
              WebkitTextStroke: '0.5px black', // Borde negro alrededor del texto
            },
            '& .MuiListItemText-secondary': {
              fontFamily: '"ONE PIECE", sans-serif',
              fontSize: '1.4rem',
              color: '#000000',
            },
          }}
        >
          <ListItemText
            primary="Abandonar el Barco"
            secondary="Salir de tu cuenta"
          />
        </ListItem>
      </List>
    </AuthLayout>
  );
};

export default Configuracion;
