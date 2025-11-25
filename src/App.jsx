import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import ResultsTable from './components/ResultsTable';
import {
  searchJobs,
  getDepartments,
  getProcessTypes,
  getConvocatorias,
  getEntidades,
  getMunicipalities,
  getLevels,
  getSalaryRanges,
  getDisabilities,
} from './services/api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

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

        //console.log('levels loaded:', levels);

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

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentFilters(filters);
    try {
      const data = await searchJobs(filters);
      setJobs(data);
    } catch (err) {
      setError('Error al buscar empleos. Por favor intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Buscador SIMO</h1>
        <p>Encuentra tu empleo ideal en el sector público</p>
      </header>

      <main>
        <section className="filters-section">
          <Filters onSearch={handleSearch} lists={lists} />
        </section>

        <section className="results-section">
          {loading && <div className="loading">Cargando resultados...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && hasSearched && (
            <ResultsTable data={jobs} filters={currentFilters} lists={lists} />
          )}
          {!hasSearched && (
            <div className="welcome-message">
              Utiliza los filtros para buscar ofertas de empleo.
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 SIMO Search - Unofficial Viewer</p>
      </footer>
    </div>
  );
}

export default App;
