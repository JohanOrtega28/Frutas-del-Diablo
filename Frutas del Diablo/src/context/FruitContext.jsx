import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const FruitContext = createContext();

export const FruitProvider = ({ children }) => {
    const [frutas, setFrutas] = useState(() => {
        const savedFrutas = localStorage.getItem('frutas');
        return savedFrutas ? JSON.parse(savedFrutas) : [];
    });

    const addFruit = async (fruta) => {
        // Verificar duplicados
        const isDuplicate = frutas.some(
            (f) => f.nombre.toLowerCase() === fruta.nombre.toLowerCase()
        );

        if (isDuplicate) {
            alert(`Ya existe una fruta con el nombre "${fruta.nombre}".`);
            return null;
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