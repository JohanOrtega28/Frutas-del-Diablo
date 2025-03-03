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
        descripcion: "Las frutas Paramecia otorgan habilidades físicas únicas y diversas a su usuario. Estas habilidades pueden alterar el cuerpo del usuario, otorgarle la capacidad de generar o manipular sustancias, o afectar el entorno de maneras extraordinarias. A diferencia de las frutas Logia y Zoan, las Paramecia son las más variadas y pueden incluir desde mejoras físicas hasta poderes con efectos impredecibles, como la manipulación de la gravedad, el control del tiempo o la generación de hilos ultra resistentes.",
    },
    {
        nombre: "Logia",
        imagen: logiaImg,
        descripcion: "Las frutas Logia permiten que el usuario se convierta en un elemento natural como fuego, hielo, luz, oscuridad o magma, otorgándole la capacidad de controlar y generar dicha sustancia a voluntad. Los usuarios de Logia pueden volver su cuerpo intangible, lo que los hace casi invulnerables a los ataques físicos normales, a menos que se utilice Haki o una sustancia específica que neutralice su poder. Son consideradas las frutas más raras y poderosas debido a su versatilidad en el combate y su capacidad de evasión.",
    },
    {
        nombre: "Zoan",
        imagen: zoanImg,
        descripcion: "Las frutas Zoan otorgan la capacidad de transformarse en un animal o híbrido de animal, otorgando habilidades físicas mejoradas, fuerza, velocidad y resistencia superiores. Estas frutas permiten tres formas principales: la forma humana original, la forma animal completa y una forma híbrida que combina características de ambas. Existen variaciones avanzadas como las Zoan Prehistóricas, que permiten la transformación en criaturas extintas como dinosaurios, y las Zoan Míticas, que permiten la transformación en seres legendarios como dragones o fénix, además de otorgar habilidades sobrenaturales únicas.",
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
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '120px', marginLeft: '60px', width: '80%' }} 
                                onClick={() => navigate(`/lista-frutas?tipo=${fruta.nombre}`)}
                            >
                                VER MÁS
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Inicio;
