// paginas/EditarFruta.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FruitContext } from '../context/FruitContext'; // Importa el contexto

const EditarFruta = () => {
    const { id } = useParams(); // Obtiene el ID de la fruta desde la URL
    const { frutas, editFruit } = useContext(FruitContext); // Usa el contexto para obtener las frutas y la función editFruit
    const navigate = useNavigate();

    // Busca la fruta correspondiente al ID
    const frutaInicial = frutas.find((fruta) => fruta.id === parseInt(id)) || {
        nombre: '',
        tipo: '',
        descripcion: '',
        imagen: null, // Asegúrate de que el objeto tenga una propiedad "imagen"
    };

    const [fruitData, setFruitData] = useState(frutaInicial);

    // Maneja cambios en los campos de texto, select y textarea
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFruitData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Maneja la selección de archivos para la imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFruitData((prevData) => ({
            ...prevData,
            imagen: file, // Actualiza el estado con el archivo seleccionado
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fruitData.nombre || !fruitData.tipo || !fruitData.descripcion) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        editFruit(parseInt(id), fruitData); // Edita la fruta en el contexto
        alert(`Fruta "${fruitData.nombre}" editada con éxito!`);
        navigate('/perfil'); // Navega de vuelta al perfil
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Editar Fruta del Diablo</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                {/* Campo para el nombre */}
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="nombre"
                        value={fruitData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la Fruta *"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                {/* Campo para el tipo */}
                <div style={{ marginBottom: '15px' }}>
                    <select
                        name="tipo"
                        value={fruitData.tipo}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        <option value="">Tipo de Fruta</option>
                        <option value="Paramecia">Paramecia</option>
                        <option value="Logia">Logia</option>
                        <option value="Zoan">Zoan</option>
                    </select>
                </div>

                {/* Campo para la descripción */}
                <div style={{ marginBottom: '15px' }}>
                    <textarea
                        name="descripcion"
                        value={fruitData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción *"
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    ></textarea>
                </div>

                {/* Campo para la imagen */}
                <div style={{ marginBottom: '15px', position: 'relative' }}>
                    <label
                        htmlFor="imagen"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            border: '1px dashed #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        {fruitData.imagen ? fruitData.imagen.name : 'Selecciona una imagen de la fruta *'}
                    </label>
                    <input
                        id="imagen"
                        type="file"
                        name="imagen"
                        accept="image/*" // Solo permite archivos de imagen
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Ocultar el input real
                    />
                </div>

                {/* Botón para enviar el formulario */}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    GUARDAR CAMBIOS
                </button>
            </form>
        </div>
    );
};

export default EditarFruta;