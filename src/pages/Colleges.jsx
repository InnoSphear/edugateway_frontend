import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollegeCard from '../components/CollegeCard';
import Filters from '../components/Filters';
import { collegeAPI } from '../utils/api';

const Colleges = () => {
  const [searchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const fetchColleges = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = {};
      for (const [key, value] of searchParams.entries()) {
        if (value) queryParams[key] = value;
      }
      const res = await collegeAPI.getAll({ ...queryParams, ...params });
      setColleges(res.data.colleges);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('Failed to fetch colleges:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, [searchParams]);

  const handleFilterChange = (filters) => {
    fetchColleges(filters);
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Explore Colleges in India</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Find the best colleges based on rankings, fees, placements, and more</p>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <aside className="desktop-only" style={{ width: '280px', flexShrink: 0 }}>
          <Filters onFilterChange={handleFilterChange} />
        </aside>

        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              {loading ? 'Loading...' : `${pagination.total || 0} colleges found`}
            </p>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="mobile-only" style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px',
              borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {filtersOpen && (
            <div style={{ marginBottom: '24px' }}>
              <Filters onFilterChange={handleFilterChange} />
            </div>
          )}

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ height: '360px', background: '#e2e8f0', borderRadius: '16px', animation: 'pulse 2s infinite' }} />)}
            </div>
          ) : colleges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏫</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>No colleges found</h3>
              <p style={{ color: '#64748b' }}>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {colleges.map(college => <CollegeCard key={college._id} college={college} />)}
              </div>

              {pagination.pages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
                  {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => (
                    <button key={i} onClick={() => fetchColleges({ page: i + 1 })} style={{
                      width: '44px', height: '44px', borderRadius: '10px', border: '2px solid #e2e8f0',
                      background: pagination.page === i + 1 ? '#2563eb' : 'white',
                      color: pagination.page === i + 1 ? 'white' : '#475569', cursor: 'pointer', fontWeight: 600
                    }}>{i + 1}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Colleges;
