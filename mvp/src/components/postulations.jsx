import React, { useState, useMemo, useEffect } from 'react'
import { usePostulation } from './postulationSystem'
import { Info, Search, Star, StarOff, ChevronLeft, ChevronRight, Eye, Check, ArrowLeft, MapPin, Briefcase, Building, Book, Clock, Users } from 'lucide-react'
import '../stylesheets/postulations.css'

// asignaturas de prueba para el proyecto, esto vendria normalmente de una base de datos o API, pero como no estamos haciendo backend, lo dejamos así.
const asignaturas = [
    { id: 1, nombre: "Redes de Computadores", tipo: "Docente", departamento: "Informática", sede: "Casa Central-Valparaíso", sigla: "INF-343", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 30 },
    { id: 2, nombre: "Estructura de Datos", tipo: "Investigación", departamento: "Informática", sede: "Sede Viña del Mar-Viña del Mar", sigla: "INF-134", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 25 },
    { id: 3, nombre: "Lenguaje de Programación", tipo: "Docente", departamento: "Informática", sede: "Campus San Joaquín-Santiago", sigla: "INF-253", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 35 },
    { id: 4, nombre: "Campos Electromagnéticos", tipo: "Investigación", departamento: "Electrónica", sede: "Casa Central-Valparaíso", sigla: "ELO-204", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 20 },
    { id: 5, nombre: "Administración de Empresa", tipo: "Administrativa", departamento: "Industrial", sede: "Sede Viña del Mar-Viña del Mar", sigla: "IND-201", periodo: "2023-2", horasSemana: 3, cuposDisponibles: 40 },
    { id: 6, nombre: "Bases de Datos", tipo: "Docente", departamento: "Informática", sede: "Casa Central-Valparaíso", sigla: "INF-239", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 30 },
    { id: 7, nombre: "Sistemas Operativos", tipo: "Docente", departamento: "Informática", sede: "Campus San Joaquín-Santiago", sigla: "INF-246", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 35 },
    { id: 8, nombre: "Inteligencia Artificial", tipo: "Investigación", departamento: "Informática", sede: "Casa Central-Valparaíso", sigla: "INF-295", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 25 },
    { id: 9, nombre: "Redes de Datos", tipo: "Docente", departamento: "Telemática", sede: "Casa Central-Valparaíso", sigla: "TEL-131", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 30 },
    { id: 10, nombre: "Seguridad Informática", tipo: "Docente", departamento: "Telemática", sede: "Campus San Joaquín-Santiago", sigla: "TEL-235", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 25 },
    { id: 11, nombre: "Sistemas Digitales", tipo: "Docente", departamento: "Electrónica", sede: "Casa Central-Valparaíso", sigla: "ELO-212", periodo: "2023-2", horasSemana: 6, cuposDisponibles: 35 },
    { id: 12, nombre: "Microelectrónica", tipo: "Investigación", departamento: "Electrónica", sede: "Campus San Joaquín-Santiago", sigla: "ELO-320", periodo: "2023-2", horasSemana: 4, cuposDisponibles: 20 },
]


const Tooltip = ({ children, text }) => {
    return (
        <div className="tooltip">
            {children}
            <span className="tooltip-text">{text}</span>
        </div>
    );
};

const CourseModal = ({ course, onClose, onPostular, isFavorite, onToggleFavorite }) => {
    if (!course) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="icon-button back-button">
                    <ArrowLeft />
                </button>
                <h2>{course.nombre}</h2>
                <button 
                    onClick={() => onToggleFavorite(course.id)} 
                    className="icon-button favorite-button"
                >
                    {isFavorite ? <Star className="favorite-icon" /> : <StarOff />}
                </button>
                <div className="course-details">
                    <p><Book size={16} /> <strong>Sigla:</strong> {course.sigla}</p>
                    <p><Clock size={16} /> <strong>Periodo:</strong> {course.periodo}</p>
                    <p><Clock size={16} /> <strong>Horas por semana:</strong> {course.horasSemana}</p>
                    <p><Users size={16} /> <strong>Cupos disponibles:</strong> {course.cuposDisponibles}</p>
                    <p><Briefcase size={16} /> <strong>Tipo:</strong> {course.tipo}</p>
                    <p><Building size={16} /> <strong>Departamento:</strong> {course.departamento}</p>
                    <p><MapPin size={16} /> <strong>Sede:</strong> {course.sede}</p>
                </div>
                <div className="modal-buttons">
                    <button onClick={() => onPostular(course.id)} className="confirm-button">
                        <Check /> Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};


const ConfirmationModal = ({ courses, onConfirm, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="icon-button back-button">
                    <ArrowLeft />
                </button>
                <h2>Confirmar Postulación</h2>
                <p>¿Estás seguro de que quieres postular a los siguientes ramos?</p>
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.nombre}</li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">
                        <Check /> Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
const IconLegend = () => {
    return (
        <div className="icon-legend">
            <h3>Leyenda de Iconos</h3>
            <ul>
                <li><Eye /> Ver detalles del curso</li>
                <li><Star /> Agregar/Quitar de favoritos</li>
                <li><Check /> Curso postulado</li>
                <li><Briefcase /> Tipo de curso</li>
                <li><Building /> Departamento</li>
                <li><MapPin /> Sede</li>
            </ul>
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
    const [favorites, setFavorites] = useState([])
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
    const { addPostulacion, postulaciones } = usePostulation()
    const [currentPage, setCurrentPage] = useState(1)
    const coursesPerPage = 5
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites))
        }
    }, [])

    const saveFavorites = (newFavorites) => {
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    const toggleFavorite = (id) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id]
        saveFavorites(newFavorites)
    }
    
    const asignaturasFiltradas = useMemo(() => {
        return asignaturas.filter((asignatura) => {
            const coincideNombre = asignatura.nombre.toLowerCase().includes(busqueda.toLowerCase())
            const coincideTipo = tipoFiltro === "todos" || asignatura.tipo === tipoFiltro
            const coincideDepto = deptoFiltro === "todos" || asignatura.departamento === deptoFiltro
            const coincideSede = sedeFiltro === "todos" || asignatura.sede === sedeFiltro
            const coincideFavorito = !showOnlyFavorites || favorites.includes(asignatura.id)
            return coincideNombre && coincideTipo && coincideDepto && coincideSede && coincideFavorito
        })
    }, [busqueda, tipoFiltro, deptoFiltro, sedeFiltro, showOnlyFavorites, favorites])
    const totalPages = Math.ceil(asignaturasFiltradas.length / coursesPerPage)
    const toggleSeleccion = (id) => {
        setSeleccionadas((prev) => {
            if (prev.includes(id)) {
                return prev.filter((asigId) => asigId !== id)
            } else if (prev.length < 3 && !isAlreadyPostulated(id)) {
                return [...prev, id]
            } else {
                return prev
            }
        })
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
        if (seleccionadas.length < 3 && !isAlreadyPostulated(id)) {
            toggleSeleccion(id)
        }
        handleCloseModal()
    }

    const isAlreadyPostulated = (id) => {
        return postulaciones.some(p => p.id === id)
    }
    const sortedAsignaturas = useMemo(() => {
        return asignaturasFiltradas.sort((a, b) => {
            const aPostulated = isAlreadyPostulated(a.id);
            const bPostulated = isAlreadyPostulated(b.id);
            if (aPostulated && !bPostulated) return -1;
            if (!aPostulated && bPostulated) return 1;
            return 0;
        });
    }, [asignaturasFiltradas, postulaciones, isAlreadyPostulated]);

    const currentCourses = sortedAsignaturas.slice(
        (currentPage - 1) * coursesPerPage,
        currentPage * coursesPerPage
    );

    const goToNextPage = () => {
        setCurrentPage(page => Math.min(page + 1, totalPages))
    }

    const goToPreviousPage = () => {
        setCurrentPage(page => Math.max(page - 1, 1))
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    return (
        <div className="container">
            <h1 className="title">Postulación a Asignaturas</h1>
            
            <div className="progress-bar">
                <div 
                    className="progress" 
                    style={{width: `${(seleccionadas.length / 3) * 100}%`}}
                ></div>
                <span>{seleccionadas.length}/3</span>
            </div>
            
            <div className="filters">
                <div className="search-container">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="search-input"
                    />
                </div>
                
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
                    <option value="Casa Central-Valparaíso">Valparaíso</option>
                    <option value="Campus San Joaquín-Santiago">San Joaquín</option>
                    <option value="Campus Vitacura-Santiago">Vitacura</option>
                    <option value="Sede Viña del Mar-Viña del Mar">Viña del Mar</option>
                    <option value="Sede Concepción-Concepción">Concepción</option>
                </select>

                <Tooltip text="Mostrar favoritos">
                    <button
                        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                        className={`icon-button ${showOnlyFavorites ? 'active' : ''}`}
                    >
                        <Star />
                    </button>
                </Tooltip>
            </div>

            <table className="asignaturas-table">
                <thead>
                    <tr>
                        <th>
                            <Tooltip text="Selecciona hasta 3">
                                <Info size={16} />
                            </Tooltip>
                        </th>
                        <th>Nombre</th>
                        <th><Tooltip text="Tipo"><Briefcase size={16} /></Tooltip></th>
                        <th><Tooltip text="Departamento"><Building size={16} /></Tooltip></th>
                        <th><Tooltip text="Sede"><MapPin size={16} /></Tooltip></th>
                        <th>Acciones</th>
                        <th><Tooltip text="Postulado"><Check size={16} /></Tooltip></th>
                    </tr>
                </thead>
                <tbody>
                    {currentCourses.map((asignatura) => {
                        const isPostulated = isAlreadyPostulated(asignatura.id);
                        return (
                            <tr key={asignatura.id} className={isPostulated ? 'postulated-row' : (seleccionadas.includes(asignatura.id) ? 'selected-row' : '')}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={seleccionadas.includes(asignatura.id)}
                                        onChange={() => toggleSeleccion(asignatura.id)}
                                        disabled={isPostulated || (seleccionadas.length >= 3 && !seleccionadas.includes(asignatura.id))}
                                    />
                                </td>
                                <td>{asignatura.nombre}</td>
                                <td>{asignatura.tipo}</td>
                                <td>{asignatura.departamento}</td>
                                <td>{asignatura.sede}</td>
                                <td>
                                    <button onClick={() => handleVerMas(asignatura)} className="icon-button">
                                        <Eye />
                                    </button>
                                    <button 
                                        onClick={() => toggleFavorite(asignatura.id)} 
                                        className="icon-button"
                                    >
                                        {favorites.includes(asignatura.id) ? <Star className="favorite-icon" /> : <StarOff />}
                                    </button>
                                </td>
                                <td>
                                    {isPostulated && (
                                        <Tooltip text="Postulado">
                                            <Check className="postulado-icon" />
                                        </Tooltip>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="icon-button pagination-button">
                    <ChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="icon-button pagination-button">
                    <ChevronRight />
                </button>
            </div>
            <button 
                onClick={handlePostular} 
                className={`postular-button ${seleccionadas.length === 0 ? 'disabled' : ''}`} 
                disabled={seleccionadas.length === 0}
            >
                <Check /> Postular ({seleccionadas.length}/3)
            </button>
            <IconLegend />
            <div className="help-section">
                <h3>Ayuda</h3>
                <ul>
                    <li>Puedes seleccionar hasta 3 asignaturas para postular.</li>
                    <li>No puedes postular a una asignatura más de una vez.</li>
                    <li>Usa los filtros y la búsqueda para encontrar asignaturas específicas.</li>
                    <li>Haz clic en el icono de ojo para ver más detalles de cada asignatura.</li>
                    <li>Marca tus asignaturas favoritas para encontrarlas fácilmente.</li>
                    <li>Una vez seleccionadas, haz clic en "Postular" para confirmar.</li>
                    <li>Puedes eliminar postulaciones en tu perfil si cambias de opinión.</li>
                </ul>
            </div>
            {selectedCourse && (
                <CourseModal
                    course={selectedCourse}
                    onClose={handleCloseModal}
                    onPostular={handlePostularModal}
                    isFavorite={favorites.includes(selectedCourse.id)}
                    onToggleFavorite={toggleFavorite}
                />
            )}

            {showConfirmation && (
                <ConfirmationModal
                    courses={asignaturas.filter(a => seleccionadas.includes(a.id))}
                    onConfirm={confirmPostulation}
                    onClose={() => setShowConfirmation(false)}
                />
            )}

            {showSuccess && (
                <div className="success-message">
                    <Check /> Postulación exitosa
                </div>
            )}
        </div>
    )
}

export default Postulations