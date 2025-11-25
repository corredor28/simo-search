import React, { useState } from 'react';
import Filters from './components/Filters';
import ResultsTable from './components/ResultsTable';
import { searchJobs } from './services/api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await searchJobs(filters);
      // The API returns an array directly based on the sample response
      // But usually paginated APIs return { content: [], ... } or similar.
      // The sample response is just an array `[...]`.
      // However, the user URL had `page=0&size=1000`.
      // If the response is just the array, we use it directly.
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
          <Filters onSearch={handleSearch} />
        </section>

        <section className="results-section">
          {loading && <div className="loading">Cargando resultados...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && hasSearched && (
            <ResultsTable data={jobs} />
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
