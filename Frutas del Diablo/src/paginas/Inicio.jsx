// src/paginas/Inicio.jsx
import React from 'react';
import NavbarInicio from '../componentes/NavbarInicio';
import FrutaCard from '../componentes/FrutaCard';
import { Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import parameciaImg from '../assets/paramecia.jpg';
import logiaImg from '../assets/logia.jpg';
import zoanImg from '../assets/zoan.jpg';

const frutas = [
    {
        nombre: "Paramecia",
        imagen: parameciaImg,
        descripcion: "Las frutas Paramecia otorgan habilidades físicas únicas y diversas a su usuario.",
    },
    {
        nombre: "Logia",
        imagen: logiaImg,
        descripcion: "Las frutas Logia permiten que el usuario se convierta en un elemento natural como fuego o hielo.",
    },
    {
        nombre: "Zoan",
        imagen: zoanImg,
        descripcion: "Las frutas Zoan otorgan la capacidad de transformarse en un animal o híbrido de animal.",
    }
];

const Inicio = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavbarInicio />
            <Container style={{ marginTop: '50px' }}>
                <Grid container spacing={5} justifyContent="center">
                    {frutas.map((fruta, index) => (
                        <Grid item key={index}>
                            <FrutaCard fruta={fruta} />
                        </Grid>
                    ))}
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/lista-frutas')}
                    style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    Ver Más
                </Button>
            </Container>
        </>
    );
};

export default Inicio;
