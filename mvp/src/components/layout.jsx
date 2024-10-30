import React from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Home, FileText, User } from 'lucide-react';
import HomePage from '../pages/home_page';
import Postulacion from './postulations';
import Perfil from './profile';
import '../stylesheets/layout.css';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
            {children}
        </Link>
    );
};

const Layout = () => {
    return (
        <BrowserRouter>
            <div className="layout-container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to="/">
                                <Home className="nav-icon" size={24} />
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/postulaciones">
                                <FileText className="nav-icon" size={24} />
                                Postulaciones
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/mi-perfil">
                                <User className="nav-icon" size={24} />
                                Mi Perfil
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/postulaciones" element={<Postulacion />} />
                        <Route path="/mi-perfil" element={<Perfil />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default Layout;