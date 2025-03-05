import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const FruitContext = createContext();

export const FruitProvider = ({ children }) => {
    const [frutas, setFrutas] = useState([]);

    useEffect(() => {
        const fetchFrutas = async () => {
            const querySnapshot = await getDocs(collection(db, "frutasDelDiablo"));
            const frutasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFrutas(frutasData);
        };
        fetchFrutas();
    }, []);

    const addFruit = async (fruta) => {
        try {
            const docRef = await addDoc(collection(db, "frutasDelDiablo"), fruta);
            setFrutas([...frutas, { ...fruta, id: docRef.id }]);
            return docRef.id;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    };

    const updateFruit = async (id, updatedFruit) => {
        try {
            await setDoc(doc(db, "frutasDelDiablo", id), updatedFruit);
            setFrutas(frutas.map(fruta => fruta.id === id ? updatedFruit : fruta));
        } catch (error) {
            console.error("Error updating document: ", error);
            throw error;
        }
    };

    return (
        <FruitContext.Provider value={{ frutas, addFruit, updateFruit }}>
            {children}
        </FruitContext.Provider>
    );
};
