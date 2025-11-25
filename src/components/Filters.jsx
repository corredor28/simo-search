import React, { useState, useEffect } from 'react';
import {
    getDepartments,
    getProcessTypes,
    getConvocatorias,
    getEntidades,
    getMunicipalities,
    getLevels,
    getSalaryRanges,
    getDisabilities,
} from '../services/api';

const Filters = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        palabraClave: '',
        tipoProceso: '',
        convocatoria: '',
        entidad: '',
        departamento: '',
        municipio: '',
        nivel: '',
        salario: '',
        discapacidad: '',
        numeroOPEC: '',
    });

    const [lists, setLists] = useState({
        departments: [],
        processTypes: [],
        convocatorias: [],
        entidades: [],
        municipalities: [],
        levels: [],
        salaryRanges: [],
        disabilities: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    departments,
                    processTypes,
                    convocatorias,
                    entidades,
                    municipalities,
                    levels,
                    salaryRanges,
                    disabilities,
                ] = await Promise.all([
                    getDepartments(),
                    getProcessTypes(),
                    getConvocatorias(),
                    getEntidades(),
                    getMunicipalities(),
                    getLevels(),
                    getSalaryRanges(),
                    getDisabilities(),
                ]);

                setLists({
                    departments,
                    processTypes,
                    convocatorias,
                    entidades,
                    municipalities,
                    levels,
                    salaryRanges,
                    disabilities,
                });
            } catch (error) {
                console.error('Error loading filter lists:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    // Filter municipalities based on selected department if possible
    const filteredMunicipalities = filters.departamento
        ? lists.municipalities.filter((m) => m.departamento?.id === filters.departamento || m.departamentoId === filters.departamento)
        : lists.municipalities;

    // If the API returns flat list without department relation, we might show all or empty.
    // Assuming the API response for municipality has a department field based on previous JSON.
    // In `response_ind.json`, municipality object has `departamento: { nombre: ... }`.
    // The list endpoint likely returns similar objects.

    return (
        <form onSubmit={handleSubmit} className="filters-container">
            <div className="filter-group">
                <label htmlFor="palabraClave">Palabra Clave</label>
                <input
                    type="text"
                    id="palabraClave"
                    name="palabraClave"
                    value={filters.palabraClave}
                    onChange={handleChange}
                    placeholder="Ej: Ingenieria"
                />
            </div>

            <div className="filter-group">
                <label htmlFor="tipoProceso">Tipo de Proceso</label>
                <select
                    id="tipoProceso"
                    name="tipoProceso"
                    value={filters.tipoProceso}
                    onChange={handleChange}
                >
                    <option value="">Todos</option>
                    {lists.processTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="convocatoria">Convocatoria</label>
                <select
                    id="convocatoria"
                    name="convocatoria"
                    value={filters.convocatoria}
                    onChange={handleChange}
                >
                    <option value="">Todas</option>
                    {lists.convocatorias.map((conv) => (
                        <option key={conv.id} value={conv.id}>
                            {conv.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="entidad">Entidad</label>
                <select
                    id="entidad"
                    name="entidad"
                    value={filters.entidad}
                    onChange={handleChange}
                >
                    <option value="">Todas</option>
                    {lists.entidades.map((ent) => (
                        <option key={ent.id} value={ent.id}>
                            {ent.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="departamento">Departamento</label>
                <select
                    id="departamento"
                    name="departamento"
                    value={filters.departamento}
                    onChange={handleChange}
                >
                    <option value="">Todos</option>
                    {lists.departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="municipio">Municipio</label>
                <select
                    id="municipio"
                    name="municipio"
                    value={filters.municipio}
                    onChange={handleChange}
                    disabled={!filters.departamento && filteredMunicipalities.length > 1000} // Opt: disable if too many
                >
                    <option value="">Todos</option>
                    {filteredMunicipalities.map((muni) => (
                        <option key={muni.id} value={muni.id}>
                            {muni.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="nivel">Nivel</label>
                <select
                    id="nivel"
                    name="nivel"
                    value={filters.nivel}
                    onChange={handleChange}
                >
                    <option value="">Todos</option>
                    {lists.levels.map((lvl) => (
                        <option key={lvl.id} value={lvl.id}>
                            {lvl.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="salario">Rango Salarial</label>
                <select
                    id="salario"
                    name="salario"
                    value={filters.salario}
                    onChange={handleChange}
                >
                    <option value="">Todos</option>
                    {lists.salaryRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                            {range.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="discapacidad">Discapacidad</label>
                <select
                    id="discapacidad"
                    name="discapacidad"
                    value={filters.discapacidad}
                    onChange={handleChange}
                >
                    <option value="">Todas</option>
                    {lists.disabilities.map((disc) => (
                        <option key={disc.id} value={disc.id}>
                            {disc.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="numeroOPEC">Número OPEC</label>
                <input
                    type="text"
                    id="numeroOPEC"
                    name="numeroOPEC"
                    value={filters.numeroOPEC}
                    onChange={handleChange}
                    placeholder="Ej: 123456"
                />
            </div>

            <button type="submit" className="search-button">
                Buscar
            </button>
        </form>
    );
};

export default Filters;
