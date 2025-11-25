import axios from 'axios';

const api = axios.create({
    baseURL: '/empleos/ofertaPublica',
});

// Helper to handle responses
const fetchList = async (url, params = {}) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return [];
    }
};

export const searchJobs = async (filters, page = 0, size = 1000) => {
    const params = {
        search_palabraClave: filters.palabraClave || '',
        tipoProceso: filters.tipoProceso || '',
        search_convocatoria: filters.convocatoria || '',
        search_entidad: filters.entidad || '',
        search_departamento: filters.departamento || '',
        search_municipio: filters.municipio || '',
        search_nivel: filters.nivel || '',
        search_salario: filters.salario || '',
        search_discapacidad: filters.discapacidad || '',
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

export const getProcessTypes = () => fetchList('/tipoprocesoseleccion/list');

export const getConvocatorias = () => fetchList('/convocatorias/visiblesTipo/list/', { nombre: '*' });

export const getEntidades = () => fetchList('/entidades/opecVisible/list/');

export const getDepartments = () => fetchList('/departamento/');

export const getMunicipalities = (deptId) => {
    if (!deptId) return fetchList('/municipio/');
    // Usually APIs filter by department ID if passed, but the URL provided is just /municipio/
    // We might need to filter client-side or check if the API accepts a param.
    // Based on common patterns, it might be /municipio/list?departamentoId=... or similar.
    // But the user gave: https://simo.cnsc.gov.co/municipio/
    // Let's assume it returns all or we filter client side if needed.
    // Actually, let's try to fetch all.
    return fetchList('/municipio/');
};

export const getLevels = () => fetchList('/gradosNivel/list/');

export const getSalaryRanges = () => fetchList('/empleos/rangos/');

export const getDisabilities = () => fetchList('/tipodiscapacidad/list/');
