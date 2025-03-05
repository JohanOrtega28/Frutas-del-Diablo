import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar IDs únicos

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        let parsedUser = savedUser ? JSON.parse(savedUser) : {
            id: '',
            nombre: '',
            correo: '',
            contraseña: '',
            sexo: '',
            edad: '',
        };

        // Si el usuario no tiene un id, genera uno
        if (!parsedUser.id) {
            parsedUser.id = uuidv4();
            localStorage.setItem('user', JSON.stringify(parsedUser));
        }

        console.log("Usuario cargado desde localStorage:", parsedUser);
        return parsedUser;
    });

    const updateUser = (updatedUser) => {
        console.log("Actualizando usuario:", updatedUser);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
