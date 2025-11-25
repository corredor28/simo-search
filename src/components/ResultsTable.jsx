import React, { useState } from 'react';

const ResultsTable = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    if (!data || data.length === 0) {
        return <div className="no-results">No se encontraron resultados.</div>;
    }

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

    // Helper to access nested properties like 'empleo.denominacion.nombre'
    // The API response structure is: { id, empleo: { ... } }
    // But the user asked for specific fields. Let's map them.
    // The rows are "empleo".
    // Wait, the response is an array of objects, each has "empleo".
    // The user wants: id, asignacionSalarial, codigoEmpleo, denominacion, descripcion, identificador, municipio, departamento, nivelNombre, funciones_descripcion, estudio, experiencia

    // We need to flatten the data for display or handle it in the row rendering.
    // Let's assume 'data' passed here is the list of items from the API response (which are objects with 'empleo' property).

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('empleo.id')}>ID</th>
                        <th onClick={() => requestSort('empleo.asignacionSalarial')}>Salario</th>
                        <th onClick={() => requestSort('empleo.codigoEmpleo')}>Código</th>
                        <th onClick={() => requestSort('empleo.denominacion.nombre')}>Denominación</th>
                        <th onClick={() => requestSort('empleo.nivelNombre')}>Nivel</th>
                        <th onClick={() => requestSort('empleo.vacantes[0].municipio.departamento.nombre')}>Departamento</th>
                        <th onClick={() => requestSort('empleo.vacantes[0].municipio.nombre')}>Municipio</th>
                        <th onClick={() => requestSort('empleo.descripcion')}>Descripción</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => {
                        const emp = item.empleo;
                        // Safe access for nested props
                        const dept = emp.vacantes?.[0]?.municipio?.departamento?.nombre || 'N/A';
                        const muni = emp.vacantes?.[0]?.municipio?.nombre || 'N/A';
                        const denom = emp.denominacion?.nombre || 'N/A';

                        return (
                            <tr key={item.id}>
                                <td>{emp.id}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(emp.asignacionSalarial)}</td>
                                <td>{emp.codigoEmpleo}</td>
                                <td>{denom}</td>
                                <td>{emp.nivelNombre}</td>
                                <td>{dept}</td>
                                <td>{muni}</td>
                                <td className="description-cell" title={emp.descripcion}>{emp.descripcion}</td>
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
