// paginas/Configuracion.jsx
import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../componentes/AuthLayout';

const Configuracion = () => {
    const navigate = useNavigate();

    // Función para cerrar sesión con confirmación
    const handleLogout = () => {
        const confirmLogout = window.confirm('¿Estás seguro de que deseas abandonar el barco?');
        if (confirmLogout) {
            navigate('/'); // Redirige al usuario a la página inicial
        }
    };

    return (
        <AuthLayout title="Configuración del Pirata">
            <List>
                {/* Opción para editar perfil */}
                <ListItem button onClick={() => navigate('/editar-perfil')} className="list-item">
                    <ListItemText
                        primary={<span className="list-item-primary">Editar Perfil</span>}
                        secondary={<span className="list-item-secondary">Cambia tu nombre, correo o contraseña</span>}
                    />
                </ListItem>
                <Divider />
                {/* Opción para reportar problemas */}
                <ListItem button onClick={() => navigate('/reportar-problema')} className="list-item">
                    <ListItemText
                        primary={<span className="list-item-primary">Reportar Problema</span>}
                        secondary={<span className="list-item-secondary">Informa sobre errores o información incorrecta</span>}
                    />
                </ListItem>
                <Divider />
                {/* Opción para cerrar sesión */}
                <ListItem button onClick={handleLogout} className="list-item">
                    <ListItemText
                        primary={<span className="list-item-primary">Abandonar el Barco</span>}
                        secondary={<span className="list-item-secondary">Salir de tu cuenta</span>}
                    />
                </ListItem>
            </List>
        </AuthLayout>
    );
};

export default Configuracion;