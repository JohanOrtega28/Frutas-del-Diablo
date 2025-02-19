// paginas/EditarPerfil.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext'; // Importa el contexto de usuario
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';

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
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Editar Perfil
            </Typography>

            {/* Campo para el nombre */}
            <TextField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Campo para el correo electrónico */}
            <TextField
                label="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Campo para la contraseña */}
            <TextField
                label="Contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Campo para el sexo */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Sexo</InputLabel>
                <Select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    label="Sexo"
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
            />

            {/* Mostrar mensaje de error si la edad no es válida */}
            {errorEdad && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                    La edad debe estar entre 10 y 120 años.
                </Alert>
            )}

            {/* Botón para guardar cambios */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleGuardar}
                style={{ marginTop: '10px' }}
            >
                Guardar Cambios
            </Button>
        </Container>
    );
};

export default EditarPerfil;