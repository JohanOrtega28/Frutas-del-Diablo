import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditarFruta = () => {
    const { id } = useParams(); // Obtiene el ID de la fruta desde la URL
    const navigate = useNavigate();
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
            await setDoc(doc(db, "frutasDelDiablo", id || fruitData.nombre.toLowerCase().replace(/\s+/g, '-')), fruitData);
            alert(`Fruta "${fruitData.nombre}" guardada con éxito!`);
            navigate('/inicio');
        } catch (error) {
            console.error("Error al guardar la fruta:", error);
            alert("Hubo un error al guardar la fruta.");
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>{id ? "Editar" : "Agregar"} Fruta del Diablo</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <input
                    type="text"
                    name="nombre"
                    value={fruitData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre de la Fruta *"
                    required
                />
                <select name="tipo" value={fruitData.tipo} onChange={handleChange} required>
                    <option value="">Tipo de Fruta</option>
                    <option value="Paramecia">Paramecia</option>
                    <option value="Logia">Logia</option>
                    <option value="Zoan">Zoan</option>
                </select>
                <textarea
                    name="descripcion"
                    value={fruitData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción *"
                    required
                ></textarea>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {fruitData.imagenURL && <img src={fruitData.imagenURL} alt="Fruta" width="100px" />}
                <button type="submit">GUARDAR CAMBIOS</button>
            </form>
        </div>
    );
};

export default EditarFruta;
