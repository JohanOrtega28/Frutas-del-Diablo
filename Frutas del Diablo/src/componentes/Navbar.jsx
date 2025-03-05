import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value); // Pasamos la búsqueda a `ListaFrutas.jsx`
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Frutas del Diablo
                </Typography>

                {/* Barra de búsqueda */}
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Buscar frutas..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: 'gray' }} />
                            </InputAdornment>
                        ),
                    }}
                    style={{ backgroundColor: 'white', borderRadius: '5px', width: '250px' }}
                />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" onClick={() => navigate('/add-fruit')}>
                        Añadir Fruta
                    </Button>
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>
                        <MenuItem onClick={() => navigate('/configuracion')}>Configuración</MenuItem>
                        <MenuItem onClick={() => navigate('/')}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
