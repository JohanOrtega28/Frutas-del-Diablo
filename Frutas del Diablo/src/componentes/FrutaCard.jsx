import React, { useState } from 'react';
import { Card, CardMedia, Typography, CardActionArea } from '@mui/material';
import '../estilos/FrutaCard.css';

const FrutaCard = ({ fruta }) => {
    const [volteada, setVolteada] = useState(false);

    return (
        <div className={`card-container ${volteada ? 'flipped' : ''}`} onClick={() => setVolteada(!volteada)}>
            <div className="card-front">
                <Card sx={{ width: 300, height: 400, position: 'relative' }}>
                    <CardActionArea sx={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            image={fruta.imagen}
                            alt={fruta.nombre}
                            sx={{ height: '100%', objectFit: 'cover' }} // La imagen cubre toda la carta
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                color: 'white',
                                textAlign: 'center',
                                padding: '10px',
                            }}
                        >
                            {fruta.nombre}
                        </Typography>
                    </CardActionArea>
                </Card>
            </div>

            <div className="card-back">
                <Card sx={{ width: 300, height: 400, backgroundColor: '#333', color: '#fff', padding: 2 }}>
                    <Typography variant="h5" align="center">{fruta.nombre}</Typography>
                    <Typography variant="body2" align="center">{fruta.descripcion}</Typography>
                </Card>
            </div>
        </div>
    );
};

export default FrutaCard;
