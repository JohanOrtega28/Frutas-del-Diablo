import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';

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

        // Limpiar el formulario después de guardar
        setFruit({ name: '', type: '', description: '', image: null });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Añadir Fruta del Diablo</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre de la Fruta"
                    name="name"
                    fullWidth
                    margin="normal"
                    required
                    value={fruit.name}
                    onChange={handleChange}
                />
                
                <TextField
                    label="Tipo de Fruta"
                    name="type"
                    select
                    fullWidth
                    margin="normal"
                    required
                    value={fruit.type}
                    onChange={handleChange}
                >
                    <MenuItem value="Zoan">Zoan</MenuItem>
                    <MenuItem value="Logia">Logia</MenuItem>
                    <MenuItem value="Paramecia">Paramecia</MenuItem>
                </TextField>

                <TextField
                    label="Descripción"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    value={fruit.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '10px 0' }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>Guardar</Button>
            </form>
        </Container>
    );
};

export default AddFruitForm;
