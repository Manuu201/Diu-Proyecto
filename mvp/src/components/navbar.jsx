import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/mi-perfil" activeClassName="active">Mi Perfil</NavLink>
                </li>
                <li>
                    <NavLink to="/postulaciones" activeClassName="active">Postular</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;