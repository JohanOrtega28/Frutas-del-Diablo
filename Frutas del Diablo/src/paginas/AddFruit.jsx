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
    <div
      style={{
        background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)', // Fondo inspirado en el mar
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"ONE PIECE", sans-serif',
      }}
    >
      {/* Contenedor principal */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)', // Fondo semi-transparente
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Sombra para resaltar
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontFamily: '"ONE PIECE", sans-serif',
            color: '#ffcc00', // Dorado como el One Piece
            fontSize: '2.5rem', // Tamaño grande para el título
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Sombra para resaltar
            marginBottom: '20px',
          }}
        >
          EDITAR FRUTA DEL DIABLO
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              name="nombre"
              value={fruitData.nombre}
              onChange={handleChange}
              placeholder="Nombre de la Fruta *"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ffcc00', // Borde dorado
                borderRadius: '8px',
                fontFamily: '"ONE PIECE", sans-serif',
                fontSize: '1.2rem', // Tamaño grande para el input
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>

          {/* Campo para el tipo */}
          <div style={{ marginBottom: '20px' }}>
            <select
              name="tipo"
              value={fruitData.tipo}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ffcc00', // Borde dorado
                borderRadius: '8px',
                fontFamily: '"ONE PIECE", sans-serif',
                fontSize: '1.2rem', // Tamaño grande para el select
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <option value="">Tipo de Fruta *</option>
              <option value="Paramecia">Paramecia</option>
              <option value="Logia">Logia</option>
              <option value="Zoan">Zoan</option>
            </select>
          </div>

          {/* Campo para la descripción */}
          <div style={{ marginBottom: '20px' }}>
            <textarea
              name="descripcion"
              value={fruitData.descripcion}
              onChange={handleChange}
              placeholder="Descripción *"
              style={{
                width: '100%',
                height: '120px',
                padding: '12px',
                border: '2px solid #ffcc00', // Borde dorado
                borderRadius: '8px',
                fontFamily: '"ONE PIECE", sans-serif',
                fontSize: '1.2rem', // Tamaño grande para el textarea
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            ></textarea>
          </div>

          {/* Campo para la imagen */}
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label
              htmlFor="imagen"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                border: '2px dashed #ffcc00', // Borde dorado discontinuo
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                fontFamily: '"ONE PIECE", sans-serif',
                fontSize: '1.2rem', // Tamaño grande para el label
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {fruitData.imagen ? fruitData.imagen.name : 'Selecciona una imagen de la fruta *'}
            </label>
            <input
              id="imagen"
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.2rem', // Tamaño grande para el botón
              fontFamily: '"ONE PIECE", sans-serif',
              backgroundColor: '#ffcc00', // Dorado brillante
              color: '#000', // Texto negro
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s', // Efecto de escala al pasar el mouse
              '&:hover': {
                transform: 'scale(1.05)', // Escala al pasar el mouse
              },
            }}
          >
            GUARDAR CAMBIOS
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarFruta;