import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser
            ? JSON.parse(savedUser)
            : {
                  nombre: '',
                  correo: '',
                  contraseña: '', // Nuevo campo
                  sexo: '', // Nuevo campo
                  edad: '', // Nuevo campo
              };
    });

    // Función para actualizar los datos del usuario
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Guardar en localStorage
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};