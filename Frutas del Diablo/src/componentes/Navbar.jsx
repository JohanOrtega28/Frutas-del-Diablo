import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
        onSearch(value);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#222' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/inicio')} // 🔥 Redirigir a inicio en lugar de home
                >
                    Frutas del Diablo
                </Typography>

                {/* 🔥 Ocultar barra de búsqueda solo en /add-fruit */}
                {location.pathname !== "/add-fruit" && (
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
                )}

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
                        <MenuItem onClick={() => navigate('/login')}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

// 🔥 Exportamos el componente correctamente
export default Navbar;
