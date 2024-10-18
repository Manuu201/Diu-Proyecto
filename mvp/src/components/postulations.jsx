import React, { useState, useMemo } from 'react'
import '../stylesheets/postulations.css'

// Datos de ejemplo (en una aplicación real, estos datos vendrían de una API o prop)
const asignaturas = [
    { id: 1, nombre: "Redes de Computadores", tipo: "Docente", departamento: "Informática", sede: "Casa Central-Valparaíso" },
    { id: 2, nombre: "Estructura de Datos", tipo: "Investigación", departamento: "Informática", sede: "Sede Viña del Mar-Viña del Mar" },
    { id: 3, nombre: "Lenguaje de Programación", tipo: "Docente", departamento: "Informática", sede: "Campus San Joaquín-Santiago" },
    { id: 4, nombre: "Campos Electromagnéticos", tipo: "Investigación", departamento: "Electrónica", sede: "Casa Central-Valparaíso" },
    { id: 5, nombre: "Administración de Empresa", tipo: "Administrativa", departamento: "Industrial", sede: "Sede Viña del Mar-Viña del Mar" },
]

const Postulations = () => {
    const [busqueda, setBusqueda] = useState("")
    const [tipoFiltro, setTipoFiltro] = useState("todos")
    const [deptoFiltro, setDeptoFiltro] = useState("todos")
    const [sedeFiltro, setSedeFiltro] = useState("todos")
    const [seleccionadas, setSeleccionadas] = useState([])

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
        console.log("Postulando a asignaturas con IDs:", seleccionadas)
        // Aquí iría la lógica para enviar la postulación
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handlePostular} className="postular-button">
                Postular a Asignaturas Seleccionadas
            </button>
        </div>
    )
}

export default Postulations