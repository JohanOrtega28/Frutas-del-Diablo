import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import { FruitContext } from '../context/FruitContext';

const EditarFruta = () => {
    const { id } = useParams(); // Obtiene el ID de la fruta desde la URL
    const navigate = useNavigate();
    const { updateFruit } = useContext(FruitContext);
    const [fruitData, setFruitData] = useState({
        nombre: '',
        tipo: '',
        descripcion: '',
        imagenURL: ''
    });

    useEffect(() => {
        const fetchFruta = async () => {
            if (id) {
                const docRef = doc(db, "frutasDelDiablo", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFruitData(docSnap.data());
                } else {
                    console.error("No se encontró la fruta.");
                }
            }
        };

        fetchFruta();
    }, [id]);

    // Maneja cambios en los campos de texto, select y textarea
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFruitData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Maneja la selección de archivos para la imagen
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `frutas/${file.name}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            setFruitData((prevData) => ({
                ...prevData,
                imagenURL: imageUrl,
            }));
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fruitData.nombre || !fruitData.tipo || !fruitData.descripcion) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            await updateFruit(id, fruitData);
            alert(`Fruta "${fruitData.nombre}" actualizada con éxito!`);
            navigate('/perfil');
        } catch (error) {
            console.error("Error al actualizar la fruta:", error);
            alert("Hubo un error al actualizar la fruta.");
        }
    };

    return (
        <Container style={{ marginTop: '20px', maxWidth: '400px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Editar Fruta del Diablo
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={fruitData.nombre}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    select
                    label="Tipo"
                    name="tipo"
                    value={fruitData.tipo}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="Paramecia">Paramecia</MenuItem>
                    <MenuItem value="Logia">Logia</MenuItem>
                    <MenuItem value="Zoan">Zoan</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    value={fruitData.descripcion}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '10px' }}
                />
                {fruitData.imagenURL && (
                    <img src={fruitData.imagenURL} alt="Fruta" style={{ width: '100px', marginTop: '10px' }} />
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Guardar Cambios
                </Button>
            </form>
        </Container>
    );
};

export default EditarFruta;
