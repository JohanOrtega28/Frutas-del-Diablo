import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { Container, Typography, Card, CardContent } from '@mui/material';

const VerFruta = () => {
    const { id } = useParams();
    const [fruta, setFruta] = useState(null);

    useEffect(() => {
        const fetchFruta = async () => {
            const docRef = doc(db, "frutasDelDiablo", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFruta(docSnap.data());
            } else {
                console.error("No se encontró la fruta.");
            }
        };

        fetchFruta();
    }, [id]);

    if (!fruta) return <p>Cargando...</p>;

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{fruta.nombre}</Typography>
                    <Typography variant="h6">Tipo: {fruta.tipo}</Typography>
                    <Typography>{fruta.descripcion}</Typography>
                    {fruta.imagenURL && <img src={fruta.imagenURL} alt={fruta.nombre} width="300px" />}
                </CardContent>
            </Card>
        </Container>
    );
};

export default VerFruta;
