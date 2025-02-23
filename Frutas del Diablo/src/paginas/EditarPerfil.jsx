import React, { useContext, useEffect, useState } from 'react';
import {
  UserContext
} from '../context/UserContext'; // Importa el contexto de usuario
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';

const EditarPerfil = () => {
  const { user, updateUser } = useContext(UserContext); // Usa el contexto para obtener los datos del usuario

  // Estado local para los campos del formulario
  const [nombre, setNombre] = useState(user.nombre || '');
  const [correo, setCorreo] = useState(user.correo || '');
  const [contraseña, setContraseña] = useState(user.contraseña || '');
  const [sexo, setSexo] = useState(user.sexo || '');
  const [edad, setEdad] = useState(user.edad || '');
  const [errorEdad, setErrorEdad] = useState(false); // Estado para manejar errores de validación

  // Actualizar el estado local cuando cambien los datos del usuario en el contexto
  useEffect(() => {
    setNombre(user.nombre || '');
    setCorreo(user.correo || '');
    setContraseña(user.contraseña || '');
    setSexo(user.sexo || '');
    setEdad(user.edad || '');
  }, [user]);

  const handleGuardar = () => {
    // Validar que la edad esté dentro del rango permitido
    const edadNumerica = parseInt(edad, 10);
    if (isNaN(edadNumerica) || edadNumerica < 10 || edadNumerica > 120) {
      setErrorEdad(true);
      return;
    }
    // Si no hay errores, actualizar los datos del usuario en el contexto
    updateUser({
      nombre,
      correo,
      contraseña,
      sexo,
      edad: edadNumerica,
    });
    alert('Perfil actualizado');
    setErrorEdad(false); // Limpiar el error después de guardar
  };

  return (
    <Container
      sx={{
        marginTop: '40px',
        fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente ONE PIECE globalmente
        fontSize: '1.2rem', // Aumentar el tamaño de fuente global
      }}
    >
      {/* Título */}
      <Typography
        variant="h3" // Usar h3 para un tamaño más grande
        gutterBottom
        sx={{
          fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al título
          color: '#ffcc00', // Dorado como el One Piece
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '2px 2px 4px #000', // Sombra para resaltar
          fontSize: '2.5rem', // Tamaño más grande para el título
          marginBottom: '30px', // Más espacio debajo del título
        }}
      >
        EDITAR PERFIL
      </Typography>

      {/* Campo para el nombre */}
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          sx: {
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al campo
            fontSize: '1.4rem', // Tamaño de fuente más grande
            height: '60px', // Altura del campo
            padding: '10px', // Espaciado interno
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.4rem', // Tamaño de fuente de la etiqueta
          },
        }}
        sx={{
          marginBottom: '25px', // Más espacio entre los campos
        }}
      />

      {/* Campo para el correo electrónico */}
      <TextField
        label="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          sx: {
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al campo
            fontSize: '1.4rem', // Tamaño de fuente más grande
            height: '60px', // Altura del campo
            padding: '10px', // Espaciado interno
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.4rem', // Tamaño de fuente de la etiqueta
          },
        }}
        sx={{
          marginBottom: '25px', // Más espacio entre los campos
        }}
      />

      {/* Campo para la contraseña */}
      <TextField
        label="Contraseña"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          sx: {
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al campo
            fontSize: '1.4rem', // Tamaño de fuente más grande
            height: '60px', // Altura del campo
            padding: '10px', // Espaciado interno
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.4rem', // Tamaño de fuente de la etiqueta
          },
        }}
        sx={{
          marginBottom: '25px', // Más espacio entre los campos
        }}
      />

      {/* Campo para el sexo */}
      <FormControl fullWidth margin="normal">
        <InputLabel
          sx={{
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente a la etiqueta
            fontSize: '1.4rem', // Aumentar el tamaño de fuente
          }}
        >
          Sexo
        </InputLabel>
        <Select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          label="Sexo"
          sx={{
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al select
            fontSize: '1.4rem', // Aumentar el tamaño de fuente
            height: '60px', // Altura mayor para el menú desplegable
            padding: '10px', // Espaciado interno
          }}
        >
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </Select>
      </FormControl>

      {/* Campo para la edad */}
      <TextField
        label="Edad"
        type="number"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{
          min: 10, // Límite mínimo
          max: 120, // Límite máximo
        }}
        error={errorEdad} // Marcar el campo como erróneo si está fuera del rango
        helperText={errorEdad ? 'La edad debe estar entre 10 y 120 años.' : ''}
        InputProps={{
          sx: {
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al campo
            fontSize: '1.4rem', // Aumentar el tamaño de fuente
            height: '60px', // Altura del campo
            padding: '10px', // Espaciado interno
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.4rem', // Aumentar el tamaño de fuente de la etiqueta
          },
        }}
        sx={{
          marginBottom: '25px', // Más espacio entre los campos
        }}
      />

      {/* Mostrar mensaje de error si la edad no es válida */}
      {errorEdad && (
        <Alert
          severity="error"
          sx={{
            marginBottom: '20px',
            fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al mensaje de error
            fontSize: '1.4rem', // Aumentar el tamaño de fuente
          }}
        >
          La edad debe estar entre 10 y 120 años.
        </Alert>
      )}

      {/* Botón para guardar cambios */}
      <Button
        variant="contained"
        onClick={handleGuardar}
        sx={{
          marginTop: '10px',
          padding: '10px 20px', // Reducir el padding horizontal y vertical
          fontSize: '1.2rem', // Reducir el tamaño de fuente
          fontFamily: '"ONE PIECE", sans-serif', // Aplicar la fuente al botón
          background: 'linear-gradient(45deg, #ffcc00 30%, #ffdd40 90%)', // Dorado brillante
          color: '#000', // Texto negro
          height: '50px', // Reducir la altura del botón
          minWidth: '100px', // Reducir el ancho mínimo del botón
          '&:hover': {
            background: 'linear-gradient(45deg, #ffdd40 30%, #ffcc00 90%)', // Más brillo al pasar el mouse
          },
        }}
        fullWidth
      >
        GUARDAR CAMBIOS
      </Button>
    </Container>
  );
};

export default EditarPerfil;