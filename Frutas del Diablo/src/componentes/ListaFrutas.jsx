import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Grid, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';

const ListaFrutas = ({ searchQuery }) => {
    const [frutas, setFrutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tipoFruta = queryParams.get('tipo');

    useEffect(() => {
        const fetchFrutas = async () => {
            try {
                console.log("Obteniendo frutas de Firebase...");
                const querySnapshot = await getDocs(collection(db, "frutasDelDiablo"));

                if (querySnapshot.empty) {
                    console.warn("Firestore no tiene datos en la colección frutasDelDiablo");
                }

                const frutasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Filtrar frutas por tipo si hay un tipo especificado en la URL
                const frutasFiltradas = tipoFruta
                    ? frutasData.filter(fruta => fruta.tipo.toLowerCase() === tipoFruta.toLowerCase())
                    : frutasData;

                console.log("Frutas obtenidas:", frutasFiltradas);
                setFrutas(frutasFiltradas);
            } catch (error) {
                console.error("Error obteniendo frutas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFrutas();
    }, [tipoFruta]);

    // Filtrar frutas según el término de búsqueda
    const frutasFiltradas = frutas.filter((fruta) =>
        fruta.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Frutas filtradas por búsqueda:", frutasFiltradas);

    if (loading) return <CircularProgress />;

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                {tipoFruta ? `Frutas del Tipo: ${tipoFruta}` : 'Todas las Frutas'}
            </Typography>
            {frutasFiltradas.length === 0 && <Typography variant="h6" color="error" align="center">No hay frutas disponibles</Typography>}
            <Grid container spacing={3} justifyContent="center">
                {frutasFiltradas.map((fruta) => (
                    <Grid item key={fruta.id} xs={12} sm={6} md={4}>
                        <Card style={{ padding: '10px' }}>
                            <CardContent>
                                <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
                                    {fruta.nombre}
                                </Typography>
                            </CardContent>
                            {fruta.imagenURL && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={fruta.imagenURL}
                                    alt={fruta.nombre}
                                    style={{ width: '80%', margin: '0 auto', display: 'block', borderRadius: '8px' }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="subtitle1" color="textSecondary" align="center">
                                    Tipo: {fruta.tipo}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" align="center">
                                    {fruta.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ListaFrutas;
