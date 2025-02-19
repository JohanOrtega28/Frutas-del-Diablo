// context/FruitContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FruitContext = createContext();

export const FruitProvider = ({ children }) => {
    // Estado para almacenar las frutas
    const [frutas, setFrutas] = useState(() => {
        const savedFrutas = localStorage.getItem('frutas');
        return savedFrutas ? JSON.parse(savedFrutas) : [];
    });

    // Función para añadir una fruta
    const addFruit = (fruta) => {
        // Verificar si ya existe una fruta con el mismo nombre (ignorando mayúsculas/minúsculas)
        const isDuplicate = frutas.some(
            (f) => f.nombre.toLowerCase() === fruta.nombre.toLowerCase()
        );

        if (isDuplicate) {
            // Mostrar alerta de duplicado y detener la función
            alert(`Ya existe una fruta con el nombre "${fruta.nombre}".`);
            return;
        }

        // Si no hay duplicados, agregar la fruta
        const newFrutas = [...frutas, { ...fruta, id: Date.now() }]; // Asigna un ID único
        setFrutas(newFrutas);
        localStorage.setItem('frutas', JSON.stringify(newFrutas)); // Guardar en localStorage

        // Mostrar alerta de éxito después de guardar
        alert(`Fruta "${fruta.nombre}" guardada con éxito!`);
    };

    // Función para editar una fruta
    const editFruit = (id, updatedFruit) => {
        const updatedFrutas = frutas.map((fruta) =>
            fruta.id === id ? { ...fruta, ...updatedFruit } : fruta
        );
        setFrutas(updatedFrutas);
        localStorage.setItem('frutas', JSON.stringify(updatedFrutas));
    };

    // Función para eliminar una fruta
    const deleteFruit = (id) => {
        const filteredFrutas = frutas.filter((fruta) => fruta.id !== id);
        setFrutas(filteredFrutas);
        localStorage.setItem('frutas', JSON.stringify(filteredFrutas));
    };

    return (
        <FruitContext.Provider value={{ frutas, addFruit, editFruit, deleteFruit }}>
            {children}
        </FruitContext.Provider>
    );
};