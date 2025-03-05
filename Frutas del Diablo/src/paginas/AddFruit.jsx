import React, { useState, useContext } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, Container, Typography } from '@mui/material';
import { FruitContext } from '../context/FruitContext';
import { useNavigate } from 'react-router-dom';

const AddFruit = () => {
    const { addFruit } = useContext(FruitContext);
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
                fechaCreacion: new Date()
            };

            const newFruitId = await addFruit(fruitData);

            alert("Fruta agregada correctamente!");

            // Resetear formulario
            setNombre('');
            setDescripcion('');
            setTipo('');
            setImagen(null);

            // Navegar al perfil
            navigate('/perfil');
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
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    select
                    label="Tipo de Fruta"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    margin="normal"
                    required
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="Paramecia">Paramecia</option>
                    <option value="Logia">Logia</option>
                    <option value="Zoan">Zoan</option>
                </TextField>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '10px', marginBottom: '10px' }}
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