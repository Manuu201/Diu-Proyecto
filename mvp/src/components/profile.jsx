import React, { useState } from 'react';
import { usePostulation } from './postulationSystem';
import '../stylesheets/profile.css';

const ConfirmationModal = ({ postulacion, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar Eliminación</h2>
                <p>¿Estás seguro de que quieres eliminar la postulación al siguiente ramo?</p>
                <p><strong>{postulacion.asignatura}</strong></p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
  const personalData = {
    nombre: "Juan Pérez",
    rut: "201873092-k",
    email: "juan.perez@example.com",
    carrera: "Ingeniería civil Informática"
  };

  const { postulaciones, removePostulacion } = usePostulation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [postulacionToDelete, setPostulacionToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEliminarPostulacion = (postulacion) => {
    setPostulacionToDelete(postulacion);
    setShowConfirmation(true);
  };

  const confirmEliminarPostulacion = () => {
    removePostulacion(postulacionToDelete.id);
    setShowConfirmation(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
                    onClick={() => handleEliminarPostulacion(postulacion)}
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

      {showConfirmation && (
        <ConfirmationModal
          postulacion={postulacionToDelete}
          onConfirm={confirmEliminarPostulacion}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showSuccess && (
        <div className="success-message">
          La eliminación ha sido exitosa.
        </div>
      )}
    </div>
  );
};

export default Profile;