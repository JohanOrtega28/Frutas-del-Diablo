import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FruitContext } from '../context/FruitContext'; // Importa el contexto de frutas
import { UserContext } from '../context/UserContext'; // Importa el contexto de usuario
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Box,
} from '@mui/material';

const Perfil = () => {
  const navigate = useNavigate();
  const { frutas, deleteFruit } = useContext(FruitContext); // Usa el contexto para obtener las frutas y la función deleteFruit
  const { user } = useContext(UserContext); // Usa el contexto para obtener los datos del usuario

  // Función para editar una fruta
  const handleEditarFruta = (id) => {
    navigate(`/editar-fruta/${id}`);
  };

  // Función para eliminar una fruta
  const handleEliminarFruta = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta fruta?');
    if (confirmDelete) {
      deleteFruit(id); // Elimina la fruta usando el contexto
      alert(`Fruta con ID ${id} eliminada`);
    }
  };

  return (
    <Container
      sx={{
        marginTop: '20px',
        background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
        minHeight: '100vh',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
      }}
    >
      <Paper
        sx={{
          padding: '30px',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.95)',
          fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#ffcc00',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px #000',
            marginBottom: '20px',
            fontSize: '2.5rem', // Tamaño grande para el título
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
          }}
        >
          Perfil de Usuario
        </Typography>

        <Box
          sx={{
            marginBottom: '20px',
            padding: '15px',
            border: '2px solid #ffcc00',
            borderRadius: '10px',
            background: '#f9f9f9',
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>Nombre: {user.nombre}</Typography>
          <Typography variant="h6" sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>Correo: {user.correo}</Typography>
          <Typography variant="h6" sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>Sexo: {user.sexo || 'No especificado'}</Typography>
          <Typography variant="h6" sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>Edad: {user.edad || 'No especificada'}</Typography>
          <Typography variant="h6" sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>Rol: Usuario Regular</Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            background: 'linear-gradient(45deg, #ffcc00 30%, #ffdd40 90%)',
            color: '#000',
            padding: '10px',
            fontSize: '1.2rem', // Tamaño grande para el botón
            '&:hover': {
              background: 'linear-gradient(45deg, #ffdd40 30%, #ffcc00 90%)',
            },
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
          }}
          onClick={() => navigate('/editar-perfil')}
        >
          EDITAR PERFIL
        </Button>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography
          variant="h5"
          sx={{
            color: '#ffcc00',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '2rem', // Tamaño grande para el subtítulo
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
          }}
        >
          Frutas Registradas
        </Typography>

        {frutas.length > 0 ? (
          <List>
            {frutas.map((fruta) => (
              <ListItem
                key={fruta.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  marginBottom: '10px',
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
                }}
              >
                <ListItemText
                  primary={<span style={{ fontWeight: 'bold', color: '#333', fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.4rem' }}>{fruta.nombre}</span>}
                  secondary={`Tipo: ${fruta.tipo}`}
                  sx={{ flexGrow: 1 }}
                />
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: '#ffcc00',
                      color: '#ffcc00',
                      '&:hover': {
                        borderColor: '#ffdd40',
                        color: '#ffdd40',
                      },
                      fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
                      fontSize: '1.2rem', // Tamaño grande para el botón
                    }}
                    onClick={() => handleEditarFruta(fruta.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ fontFamily: '"ONE PIECE", sans-serif', fontSize: '1.2rem' }} // Aplicar la tipografía
                    onClick={() => handleEliminarFruta(fruta.id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              color: '#ffcc00',
              fontStyle: 'italic',
              fontFamily: '"ONE PIECE", sans-serif', // Aplicar la tipografía
              fontSize: '1.4rem', // Tamaño grande para el mensaje
            }}
          >
            No has registrado ninguna fruta todavía.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Perfil;
