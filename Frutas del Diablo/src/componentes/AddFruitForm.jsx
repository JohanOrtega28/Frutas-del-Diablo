// src/componentes/AddFruitForm.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Container, Typography } from "@mui/material";

const AddFruitForm = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [imagenURL, setImagenURL] = useState("");

    const handleAddFruit = async (e) => {
        e.preventDefault();
        console.log("📌 handleAddFruit se ejecutó!");  // 👈 Log de depuración inicial

        if (!nombre || !descripcion || !tipo) {
            alert("Por favor completa todos los campos obligatorios");
            console.warn("⚠️ Falta completar algún campo obligatorio");
            return;
        }

        const nuevaFruta = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            tipo: tipo.trim(),
            imagenURL: imagenURL.trim() || "",
        };

        console.log("📤 Enviando datos a Firestore:", nuevaFruta); // 👈 Log para ver qué se envía

        try {
            const docRef = await addDoc(collection(db, "frutasDelDiablo"), nuevaFruta);
            console.log("✅ Fruta agregada con ID:", docRef.id);

            // Limpiar el formulario después de agregar
            setNombre("");
            setDescripcion("");
            setTipo("");
            setImagenURL("");
            alert("✅ Fruta agregada exitosamente!");
        } catch (error) {
            console.error("❌ Error agregando fruta:", error);
        }
    };

    return (
        <Container style={{ marginTop: "20px", maxWidth: "400px" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Agregar Nueva Fruta
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
                />
                <TextField
                    fullWidth
                    label="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Imagen URL (Opcional)"
                    value={imagenURL}
                    onChange={(e) => setImagenURL(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
                    Agregar Fruta
                </Button>
            </form>
        </Container>
    );
};

export default AddFruitForm;
