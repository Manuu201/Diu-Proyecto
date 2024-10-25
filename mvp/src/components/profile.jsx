import React, { useState } from 'react';
import { usePostulation } from './postulationSystem';
import { Info } from 'lucide-react';
import '../stylesheets/profile.css';

const asignaturas = [
    { id: 1, nombre: "Redes de Computadores", tipo: "Docente", departamento: "Informática", sede: "Casa Central-Valparaíso", sigla: "INF-343", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 30 },
    { id: 2, nombre: "Estructura de Datos", tipo: "Investigación", departamento: "Informática", sede: "Sede Viña del Mar-Viña del Mar", sigla: "INF-134", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 25 },
    { id: 3, nombre: "Lenguaje de Programación", tipo: "Docente", departamento: "Informática", sede: "Campus San Joaquín-Santiago", sigla: "INF-253", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 35 },
    { id: 4, nombre: "Campos Electromagnéticos", tipo: "Investigación", departamento: "Electrónica", sede: "Casa Central-Valparaíso", sigla: "ELO-204", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 20 },
    { id: 5, nombre: "Administración de Empresa", tipo: "Administrativa", departamento: "Industrial", sede: "Sede Viña del Mar-Viña del Mar", sigla: "IND-201", periodo: "2023-2", horasSemana: 3, cuposDisponibles: 40 },
];

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

const CourseModal = ({ course, onClose }) => {
    if (!course) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{course.nombre}</h2>
                <p><strong>Sigla:</strong> {course.sigla}</p>
                <p><strong>Periodo:</strong> {course.periodo}</p>
                <p><strong>Horas por semana:</strong> {course.horasSemana}</p>
                <p><strong>Cupos disponibles:</strong> {course.cuposDisponibles}</p>
                <p><strong>Tipo:</strong> {course.tipo}</p>
                <p><strong>Departamento:</strong> {course.departamento}</p>
                <p><strong>Sede:</strong> {course.sede}</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cerrar</button>
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
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const handleVerMas = (postulacion) => {
    const fullCourseInfo = asignaturas.find(course => course.nombre === postulacion.asignatura);
    setSelectedCourse(fullCourseInfo);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
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
        {postulaciones.length === 0 ? (
          <p>No tienes postulaciones activas.</p>
        ) : (
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
                  <td>
                    {postulacion.asignatura}
                    <button onClick={() => handleVerMas(postulacion)} className="ver-mas-button">
                      <Info size={16} />
                    </button>
                  </td>
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
        )}
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

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Profile;