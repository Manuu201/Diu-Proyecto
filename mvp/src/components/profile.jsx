import React, { useState } from 'react';
import '../stylesheets/profile.css';

const Profile = () => {
  // Ejemplo de datos personales (en una aplicación real, estos vendrían de una API o props)
  const personalData = {
    nombre: "Juan Pérez",
    rut: "201873092-k",
    email: "juan.perez@example.com",
    carrera: "Ingeniería civil Informática"
  };

  // Ejemplo de postulaciones (en una aplicación real, estos vendrían de una API o props)
  const [postulaciones, setPostulaciones] = useState([
    { id: 1, asignatura: "Lenguaje de Programación", estado: "Aceptada" },
    { id: 2, asignatura: "Estructura de Datos", estado: "Esperando respuesta" },
    { id: 3, asignatura: "Redes de Computadores", estado: "Rechazada" },
    { id: 4, asignatura: "Campos Electromagnéticos", estado: "Esperando respuesta" },
  ]);

  const eliminarPostulacion = (id) => {
    setPostulaciones(postulaciones.filter(postulacion => postulacion.id !== id));
  };

  return (
    <div className="personal-data-and-postulations">
      <section className="personal-data">
        <h2>Datos Personales</h2>
        <ul>
          <li><strong>Nombre:</strong> {personalData.nombre}</li>
          <li><strong>RUT:</strong> {personalData.rut}</li>
          <li><strong>Email:</strong> {personalData.email}</li>
          <li><strong>Carrera:</strong> {personalData.carrera}</li>
        </ul>
      </section>

      <section className="postulations">
        <h2>Mis Postulaciones</h2>
        <table>
          <thead>
            <tr>
              <th>Asignatura</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {postulaciones.map((postulacion) => (
              <tr key={postulacion.id}>
                <td>{postulacion.asignatura}</td>
                <td>
                  <span className={`status ${postulacion.estado.toLowerCase().replace(' ', '-')}`}>
                    {postulacion.estado}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => eliminarPostulacion(postulacion.id)}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Profile;