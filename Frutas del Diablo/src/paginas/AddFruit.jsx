import React, { useState, useContext } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { FruitContext } from '../context/FruitContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AddFruit = () => {
    const { addFruit } = useContext(FruitContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleAddFruit = async (e) => {
        e.preventDefault();
        if (!nombre || !descripcion || !tipo) {
            alert("Por favor completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            let imagenURL = '';
            if (imagen) {
                const storageRef = ref(storage, `frutas/${imagen.name}`);
                await uploadBytes(storageRef, imagen);
                imagenURL = await getDownloadURL(storageRef);
            }

            const fruitData = {
                nombre,
                descripcion,
                tipo,
                imagenURL,
                fechaCreacion: new Date(),
                userId: user.id,
            };

            console.log("Datos de la fruta a agregar:", fruitData);

            const fruitId = await addFruit(fruitData);

            if (fruitId) {
                console.log("✅ Fruta agregada con ID:", fruitId);

                // Resetear formulario
                setNombre('');
                setDescripcion('');
                setTipo('');
                setImagen(null);

                // Redirigir a la página de inicio o lista de frutas
                navigate('/inicio');
            }
        } catch (error) {
            console.error("❌ Error al agregar fruta:", error);
            alert("Hubo un error al guardar la fruta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ marginTop: '20px', maxWidth: '400px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Agregar Nueva Fruta del Diablo
            </Typography>
            <form onSubmit={handleAddFruit}>
                <TextField
                    fullWidth
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    fullWidth
                    select
                    label="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    margin="normal"
                    required
                >
                    <MenuItem value="Paramecia">Paramecia</MenuItem>
                    <MenuItem value="Logia">Logia</MenuItem>
                    <MenuItem value="Zoan">Zoan</MenuItem>
                </TextField>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '10px' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    style={{ marginTop: '20px' }}
                >
                    {loading ? "Guardando..." : "Agregar Fruta"}
                </Button>
            </form>
        </Container>
    );
};

export default AddFruit;
