import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FruitContext } from '../context/FruitContext';
import { UserContext } from '../context/UserContext';
import {
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Box,
} from '@mui/material';

const Perfil = () => {
    const navigate = useNavigate();
    const { frutas, deleteFruit } = useContext(FruitContext);
    const { user } = useContext(UserContext);

    // Filtrar las frutas solo para mostrar las del usuario actual
    const userFrutas = frutas.filter(fruta => fruta.userId === user.id);

    // Agregar console.log para depurar
    console.log("Frutas del usuario:", userFrutas);
    console.log("ID del usuario actual:", user.id);

    const handleEditarFruta = (id) => {
        navigate(`/editar-fruta/${id}`);
    };

    const handleEliminarFruta = (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta fruta?');
        if (confirmDelete) {
            deleteFruit(id);
            alert(`Fruta con ID ${id} eliminada`);
        }
    };

    return (
        <Container
            sx={{
                marginTop: '20px',
                background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
                minHeight: '100vh',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Paper
                sx={{
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: '#ffcc00',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textShadow: '2px 2px 4px #000',
                        marginBottom: '20px',
                    }}
                >
                    Perfil de Usuario
                </Typography>

                <Box
                    sx={{
                        marginBottom: '20px',
                        padding: '15px',
                        border: '2px solid #ffcc00',
                        borderRadius: '10px',
                        background: '#f9f9f9',
                    }}
                >
                    <Typography variant="h6">Nombre: {user.nombre}</Typography>
                    <Typography variant="h6">Correo: {user.correo}</Typography>
                    <Typography variant="h6">Sexo: {user.sexo || 'No especificado'}</Typography>
                    <Typography variant="h6">Edad: {user.edad || 'No especificada'}</Typography>
                    <Typography variant="h6">Rol: Usuario Regular</Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        background: 'linear-gradient(45deg, #ffcc00 30%, #ffdd40 90%)',
                        color: '#000',
                        padding: '10px',
                        fontSize: '1rem',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #ffdd40 30%, #ffcc00 90%)',
                        },
                    }}
                    onClick={() => navigate('/editar-perfil')}
                >
                    EDITAR PERFIL
                </Button>

                <Divider sx={{ margin: '20px 0' }} />

                <Typography
                    variant="h5"
                    sx={{
                        color: '#ffcc00',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Frutas Registradas
                </Typography>

                {userFrutas.length > 0 ? (
                    <List>
                        {userFrutas.map((fruta) => (
                            <ListItem
                                key={fruta.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    background: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <ListItemText
                                    primary={<span style={{ fontWeight: 'bold', color: '#333' }}>{fruta.nombre}</span>}
                                    secondary={`Tipo: ${fruta.tipo}`}
                                    sx={{ flexGrow: 1 }}
                                />
                                <Box sx={{ display: 'flex', gap: '10px' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#ffcc00',
                                            color: '#ffcc00',
                                            '&:hover': {
                                                borderColor: '#ffdd40',
                                                color: '#ffdd40',
                                            },
                                        }}
                                        onClick={() => handleEditarFruta(fruta.id)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleEliminarFruta(fruta.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: '#ffcc00',
                            fontStyle: 'italic',
                        }}
                    >
                        No has registrado ninguna fruta todavía.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Perfil;
