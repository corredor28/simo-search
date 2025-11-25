import React, { useState } from 'react';

const ResultsTable = ({ data, filters, lists }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    if (!data || data.length === 0) {
        return <div className="no-results">No se encontraron resultados.</div>;
    }

    // Helper to find the relevant vacancy
    const getRelevantVacancy = (item) => {
        const vacantes = item.empleo.vacantes || [];
        if (vacantes.length === 0) return null;

        // If municipality filter is active, find matching vacancy
        if (filters.municipio) {
            // filters.municipio is likely an ID (string or number)
            // vacantes[i].municipio.id is likely a number
            const match = vacantes.find(v => String(v.municipio.id) === String(filters.municipio));
            if (match) return match;
        }

        // If department filter is active, find matching vacancy
        if (filters.departamento) {
            // We need to match department.
            // filters.departamento is an ID.
            // vacantes[i].municipio.departamento usually only has 'nombre' in the snippet.
            // But let's check if we can match by name using the lists.
            const deptInfo = lists.departments.find(d => String(d.id) === String(filters.departamento));
            if (deptInfo) {
                const match = vacantes.find(v => v.municipio.departamento.nombre === deptInfo.nombre);
                if (match) return match;
            }
        }

        // Default: return first vacancy if no specific filter match found (or no filter active)
        return vacantes[0];
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            let aValue = getNestedValue(a, sortConfig.key);
            let bValue = getNestedValue(b, sortConfig.key);

            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('empleo.id')}>No OPEC</th>
                        <th onClick={() => requestSort('empleo.asignacionSalarial')}>Salario</th>
                        <th onClick={() => requestSort('empleo.denominacion.nombre')}>Denominación</th>
                        <th onClick={() => requestSort('empleo.nivelNombre')}>Nivel</th>
                        <th onClick={() => requestSort('empleo.vacantes[0].municipio.departamento.nombre')}>Departamento</th>
                        <th onClick={() => requestSort('empleo.vacantes[0].municipio.nombre')}>Municipio</th>
                        <th onClick={() => requestSort('empleo.descripcion')}>Descripción</th>
                        <th onClick={() => requestSort('empleo.funciones')}>Funciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => {
                        const emp = item.empleo;
                        const vacancy = getRelevantVacancy(item);

                        const dept = vacancy?.municipio?.departamento?.nombre || 'N/A';
                        const muni = vacancy?.municipio?.nombre || 'N/A';
                        const denom = emp.denominacion?.nombre || 'N/A';

                        return (
                            <tr key={item.id}>
                                <td>{emp.id}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(emp.asignacionSalarial)}</td>
                                <td>{denom}</td>
                                <td>{item.nivelNombre}</td>
                                <td>{dept}</td>
                                <td>{muni}</td>
                                <td className="description-cell" title={emp.descripcion}>{emp.descripcion}</td>
                                <td className="description-cell" title={emp.funciones?.map(f => f.descripcion)[0]}>
                                    {emp.funciones?.map(f => f.descripcion).join('\r\n')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export default ResultsTable;
