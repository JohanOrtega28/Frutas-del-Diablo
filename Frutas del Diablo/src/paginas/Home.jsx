import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Home.css'; // Importar los estilos

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-background">
            <div className="home-container">
                <h1 className="home-title">Bienvenido a Frutas del Diablo</h1>
                <p className="home-description">
                    Administra y descubre información sobre las Frutas del Diablo.
                </p>
                <div className="home-buttons">
                    <button className="login-button" onClick={() => navigate('/login')}>
                        Iniciar Sesión
                    </button>
                    <button className="register-button" onClick={() => navigate('/register')}>
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
