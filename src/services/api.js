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

    if (filters.salario) {
        var salaries = await getSalaryRanges();
        var salary = salaries.find((s) => s.id === parseInt(filters.salario));
        params.search_limiteInferior = salary.limiteInferior;
        params.search_limiteSuperior = salary.limiteSuperior;
    }

    try {
        const response = await api.get('', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const getProcessTypes = () => fetchList('/tipoprocesoseleccion/list');

export const getConvocatorias = () => fetchList('/convocatorias/visiblesTipo/list', { nombre: '*' });

export const getEntidades = () => fetchList('/entidades/opecVisible/list');

export const getDepartments = () => fetchList('/departamento');

export const getMunicipalities = () => fetchList('/municipio');

export const getLevels = () => fetchList('/niveles/list');

export const getSalaryRanges = () => fetchList('/empleos/rangos');

export const getDisabilities = () => fetchList('/tipodiscapacidad/list');
