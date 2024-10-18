import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenido al Sistema de Postulación de Ayudantías (PAU)</h1>
            <p>
                Aquí podrás postular a las ayudantías disponibles y gestionar tus solicitudes de manera eficiente.
            </p>
            <p>
                ¡Explora las oportunidades y encuentra la ayudantía perfecta para ti!
            </p>
            <NavLink to="/postulaciones" activeClassName="active">
                <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                    Postular
                </button>
            </NavLink>
        </div>
    );
};

export default HomePage;