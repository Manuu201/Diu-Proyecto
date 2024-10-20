import React, { useState, useMemo } from 'react'
import { usePostulation } from './postulationSystem'
import '../stylesheets/postulations.css'

// Mantenemos los datos de ejemplo de asignaturas
const asignaturas = [
    { id: 1, nombre: "Redes de Computadores", tipo: "Docente", departamento: "Informática", sede: "Casa Central-Valparaíso", sigla: "INF-343", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 30 },
    { id: 2, nombre: "Estructura de Datos", tipo: "Investigación", departamento: "Informática", sede: "Sede Viña del Mar-Viña del Mar", sigla: "INF-134", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 25 },
    { id: 3, nombre: "Lenguaje de Programación", tipo: "Docente", departamento: "Informática", sede: "Campus San Joaquín-Santiago", sigla: "INF-253", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 35 },
    { id: 4, nombre: "Campos Electromagnéticos", tipo: "Investigación", departamento: "Electrónica", sede: "Casa Central-Valparaíso", sigla: "ELO-204", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 20 },
    { id: 5, nombre: "Administración de Empresa", tipo: "Administrativa", departamento: "Industrial", sede: "Sede Viña del Mar-Viña del Mar", sigla: "IND-201", periodo: "2023-2", horasSemana: 3, cuposDisponibles: 40 },
]

const CourseModal = ({ course, onClose, onPostular }) => {
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
                    <button onClick={() => onPostular(course.id)}>Postular</button>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ courses, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar Postulación</h2>
                <p>¿Estás seguro de que quieres postular a los siguientes ramos?</p>
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.nombre}</li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

const Postulations = () => {
    const [busqueda, setBusqueda] = useState("")
    const [tipoFiltro, setTipoFiltro] = useState("todos")
    const [deptoFiltro, setDeptoFiltro] = useState("todos")
    const [sedeFiltro, setSedeFiltro] = useState("todos")
    const [seleccionadas, setSeleccionadas] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const { addPostulacion } = usePostulation()

    const asignaturasFiltradas = useMemo(() => {
        return asignaturas.filter((asignatura) => {
            const coincideNombre = asignatura.nombre.toLowerCase().includes(busqueda.toLowerCase())
            const coincideTipo = tipoFiltro === "todos" || asignatura.tipo === tipoFiltro
            const coincideDepto = deptoFiltro === "todos" || asignatura.departamento === deptoFiltro
            const coincideSede = sedeFiltro === "todos" || asignatura.sede === sedeFiltro
            return coincideNombre && coincideTipo && coincideDepto && coincideSede
        })
    }, [busqueda, tipoFiltro, deptoFiltro, sedeFiltro])

    const toggleSeleccion = (id) => {
        setSeleccionadas((prev) =>
            prev.includes(id) ? prev.filter((asigId) => asigId !== id) : [...prev, id]
        )
    }

    const handlePostular = () => {
        if (seleccionadas.length > 0) {
            setShowConfirmation(true)
        } else {
            alert("Por favor, selecciona al menos una asignatura para postular.")
        }
    }

    const confirmPostulation = () => {
        const newPostulaciones = seleccionadas.map(id => {
            const course = asignaturas.find(a => a.id === id)
            return {
                id: course.id,
                asignatura: course.nombre,
                estado: "Esperando respuesta"
            }
        })
        addPostulacion(newPostulaciones)
        setSeleccionadas([])
        setShowConfirmation(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleVerMas = (course) => {
        setSelectedCourse(course)
    }

    const handleCloseModal = () => {
        setSelectedCourse(null)
    }

    const handlePostularModal = (id) => {
        toggleSeleccion(id)
        handleCloseModal()
    }

    return (
        <div className="container">
            <h1 className="title">Sistema de Postulación a Asignaturas</h1>
            
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar asignatura..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="search-input"
                />
                
                <select 
                    value={tipoFiltro} 
                    onChange={(e) => setTipoFiltro(e.target.value)}
                    className="filter-select"
                >
                    <option value="todos">Todos los tipos</option>
                    <option value="Docente">Docente</option>
                    <option value="Investigación">Investigación</option>
                    <option value="Administrativa">Administrativa</option>
                </select>
                
                <select 
                    value={deptoFiltro} 
                    onChange={(e) => setDeptoFiltro(e.target.value)}
                    className="filter-select"
                >
                    <option value="todos">Todos los departamentos</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Informática">Informática</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Humanístico">Humanístico</option>
                </select>
                
                <select 
                    value={sedeFiltro} 
                    onChange={(e) => setSedeFiltro(e.target.value)}
                    className="filter-select"
                >
                    <option value="todos">Todas las sedes</option>
                    <option value="Casa Central-Valparaíso">Casa Central-Valparaíso</option>
                    <option value="Campus San Joaquín-Santiago">Campus San Joaquín-Santiago</option>
                    <option value="Campus Vitacura-Santiago">Campus Vitacura-Santiago</option>
                    <option value="Sede Viña del Mar-Viña del Mar">Sede Viña del Mar-Viña del Mar</option>
                    <option value="Sede Concepción-Concepción">Sede Concepción-Concepción</option>
                </select>
            </div>

            <table className="asignaturas-table">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Departamento</th>
                        <th>Sede</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asignaturasFiltradas.map((asignatura) => (
                        <tr key={asignatura.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={seleccionadas.includes(asignatura.id)}
                                    onChange={() => toggleSeleccion(asignatura.id)}
                                />
                            </td>
                            <td>{asignatura.nombre}</td>
                            <td>{asignatura.tipo}</td>
                            <td>{asignatura.departamento}</td>
                            <td>{asignatura.sede}</td>
                            <td>
                                <button onClick={() => handleVerMas(asignatura)} className="ver-mas-button">
                                    Ver más <span className="icon">ℹ️</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handlePostular} className="postular-button">
                Postular a Asignaturas Seleccionadas
            </button>

            {selectedCourse && (
                <CourseModal
                    course={selectedCourse}
                    onClose={handleCloseModal}
                    onPostular={handlePostularModal}
                />
            )}

            {showConfirmation && (
                <ConfirmationModal
                    courses={asignaturas.filter(a => seleccionadas.includes(a.id))}
                    onConfirm={confirmPostulation}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}

            {showSuccess && (
                <div className="success-message">
                    La postulación ha sido exitosa.
                </div>
            )}
        </div>
    )
}

export default Postulations