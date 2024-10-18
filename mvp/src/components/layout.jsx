import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from '../pages/home_page';
import Postulacion from './postulations';
import Perfil from './profile';   
const Layout = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/postulaciones" element={<Postulacion />} />
                    <Route exact path="/mi-perfil" element={<Perfil />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Layout;
