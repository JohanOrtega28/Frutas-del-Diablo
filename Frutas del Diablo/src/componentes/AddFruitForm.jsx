// componentes/AddFruitForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Paper,
  Box,
  InputAdornment,
} from '@mui/material';
import { LocalFlorist, Description, Image } from '@mui/icons-material';

const AddFruitForm = ({ onSave }) => {
  const [fruit, setFruit] = useState({
    name: '',
    type: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFruit({ ...fruit, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFruit({ ...fruit, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fruit.name || !fruit.type || !fruit.description) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    console.log('Fruta agregada:', fruit);
    if (onSave) onSave(fruit);
    setFruit({ name: '', type: '', description: '', image: null });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)', // Fondo inspirado en el mar
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            padding: 4,
            borderRadius: '15px',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            background: 'rgba(255, 255, 255, 0.95)', // Fondo semi-transparente
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#ffcc00', // Dorado como el One Piece
              fontWeight: 'bold',
              marginBottom: 4,
              textAlign: 'center',
              textShadow: '2px 2px 4px #000', // Sombra para resaltar
            }}
          >
            <LocalFlorist fontSize="large" sx={{ marginRight: '10px', color: '#ffcc00' }} />
            Registrar Fruta del Diablo
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Campo para el nombre */}
            <TextField
              label="Nombre de la Fruta"
              name="name"
              fullWidth
              required
              value={fruit.name}
              onChange={handleChange}
              sx={{
                marginBottom: 3,
                '& .Mui-focused': {
                  color: '#ffcc00 !important', // Resaltado dorado
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalFlorist sx={{ color: '#ffcc00' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Campo para el tipo */}
            <TextField
              label="Tipo de Fruta"
              name="type"
              select
              fullWidth
              required
              value={fruit.type}
              onChange={handleChange}
              sx={{
                marginBottom: 3,
                '& .Mui-focused': {
                  color: '#ffcc00 !important', // Resaltado dorado
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description sx={{ color: '#ffcc00' }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Zoan">Zoan</MenuItem>
              <MenuItem value="Logia">Logia</MenuItem>
              <MenuItem value="Paramecia">Paramecia</MenuItem>
            </TextField>

            {/* Campo para la descripción */}
            <TextField
              label="Descripción"
              name="description"
              fullWidth
              multiline
              rows={4}
              required
              value={fruit.description}
              onChange={handleChange}
              sx={{
                marginBottom: 3,
                '& .Mui-focused': {
                  color: '#ffcc00 !important', // Resaltado dorado
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description sx={{ color: '#ffcc00' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Campo para subir la imagen */}
            <Box
              sx={{
                margin: '20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Image />}
                  sx={{
                    background: '#ffcc00',
                    color: '#000',
                    '&:hover': {
                      background: '#ffdd40',
                    },
                  }}
                >
                  Subir Imagen
                </Button>
              </label>
              {fruit.image && (
                <Typography variant="caption" sx={{ marginLeft: '10px' }}>
                  {fruit.image.name}
                </Typography>
              )}
            </Box>

            {/* Vista previa de la imagen */}
            {fruit.image && (
              <Box sx={{ marginTop: 2 }}>
                <img
                  src={URL.createObjectURL(fruit.image)}
                  alt="Vista previa"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Box>
            )}

            {/* Botón para enviar el formulario */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 3,
                padding: '12px 30px',
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #ffcc00 30%, #ffdd40 90%)', // Dorado brillante
                color: '#000', // Texto negro
                '&:hover': {
                  background: 'linear-gradient(45deg, #ffdd40 30%, #ffcc00 90%)', // Más brillo al pasar el mouse
                },
              }}
            >
              GUARDAR FRUTA
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddFruitForm;