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

        try {
            // Guardar en Firestore
            const docRef = await addDoc(collection(db, "frutasDelDiablo"), fruta);

            // Agregar ID a los datos de la fruta
            const newFruit = { ...fruta, id: docRef.id };

            // Actualizar estado local
            const newFrutas = [...frutas, newFruit];
            setFrutas(newFrutas);

            // Guardar en localStorage
            localStorage.setItem('frutas', JSON.stringify(newFrutas));

            return docRef.id;
        } catch (error) {
            console.error("Error al agregar fruta:", error);
            alert("Hubo un error al guardar la fruta.");
            return null;
        }
    };

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