import axios from 'axios';

const api = axios.create({
    baseURL: '/empleos/ofertaPublica',
});

export const searchJobs = async (filters, page = 0, size = 1000) => {
    const params = {
        search_palabraClave: filters.palabraClave || '',
        tipoProceso: filters.tipoProceso || 'CONCURSO_ABIERTO',
        search_convocatoria: '',
        search_entidad: '',
        search_departamento: filters.departamento || '',
        search_municipio: filters.municipio || '',
        search_nivel: '',
        search_discapacidad: '',
        search_numeroOPEC: filters.numeroOPEC || '',
        page: page,
        size: size,
    };

    try {
        const response = await api.get('/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Hardcoded lists based on common Colombian departments/municipalities or typical SIMO values
// ideally these would come from an API endpoint if known
export const getDepartments = () => [
    { id: '5', nombre: 'Antioquia' },
    { id: '8', nombre: 'Atlántico' },
    { id: '11', nombre: 'Bogotá D.C.' },
    { id: '13', nombre: 'Bolívar' },
    { id: '15', nombre: 'Boyacá' },
    { id: '17', nombre: 'Caldas' },
    { id: '18', nombre: 'Caquetá' },
    { id: '19', nombre: 'Cauca' },
    { id: '20', nombre: 'Cesar' },
    { id: '23', nombre: 'Córdoba' },
    { id: '25', nombre: 'Cundinamarca' },
    { id: '27', nombre: 'Chocó' },
    { id: '41', nombre: 'Huila' },
    { id: '44', nombre: 'La Guajira' },
    { id: '47', nombre: 'Magdalena' },
    { id: '50', nombre: 'Meta' },
    { id: '52', nombre: 'Nariño' },
    { id: '54', nombre: 'Norte de Santander' },
    { id: '63', nombre: 'Quindío' },
    { id: '66', nombre: 'Risaralda' },
    { id: '68', nombre: 'Santander' },
    { id: '70', nombre: 'Sucre' },
    { id: '73', nombre: 'Tolima' },
    { id: '76', nombre: 'Valle del Cauca' },
    // Add more as needed or fetch dynamically if endpoint found
];

export const getProcessTypes = () => [
    { id: 'CONCURSO_ABIERTO', nombre: 'Concurso Abierto' },
    { id: 'CONCURSO_ASCENSO', nombre: 'Concurso Ascenso' },
];
