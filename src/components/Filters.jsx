import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collegeAPI } from '../utils/api';

const Filters = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const filters = {
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    ownership: searchParams.get('ownership') || '',
    rating: searchParams.get('rating') || '',
    feesMin: searchParams.get('feesMin') || '',
    feesMax: searchParams.get('feesMax') || '',
    sort: searchParams.get('sort') || 'ranking'
  };

  const fetchStates = async () => {
    try {
      const res = await collegeAPI.getStates();
      setStates(res.data);
    } catch (err) { console.error('Failed to fetch states:', err); }
  };

  const fetchCities = async (state) => {
    if (!state) { setCities([]); return; }
    setLoading(true);
    try {
      const res = await collegeAPI.getCities(state);
      setCities(res.data);
    } catch (err) { console.error('Failed to fetch cities:', err); }
    setLoading(false);
  };

  const handleChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    if (key === 'state') { newParams.delete('city'); setCities([]); }
    if (key === 'state' && value) fetchCities(value);
    setSearchParams(newParams);
    onFilterChange?.(Object.fromEntries(newParams));
  };

  const clearFilters = () => {
    setSearchParams({ sort: 'ranking' });
    setCities([]);
    onFilterChange?.({ sort: 'ranking' });
  };

  const activeFiltersCount = Object.entries(filters).filter(([k, v]) => v && !['sort'].includes(k)).length;

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: '96px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Filters</h3>
        {activeFiltersCount > 0 && (
          <button onClick={clearFilters} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Clear All</button>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Location</label>
        <select value={filters.state} onChange={(e) => { handleChange('state', e.target.value); fetchCities(e.target.value); }} onFocus={fetchStates} style={{
          width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', marginBottom: '8px', outline: 'none', background: 'white'
        }}>
          <option value="">Select State</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filters.city} onChange={(e) => handleChange('city', e.target.value)} disabled={!filters.state || loading} style={{
          width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', outline: 'none', opacity: filters.state ? 1 : 0.5
        }}>
          <option value="">Select City</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Ownership</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['Government', 'Private', 'Deemed'].map(o => (
            <button key={o} onClick={() => handleChange('ownership', filters.ownership === o ? '' : o)} style={{
              padding: '8px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              border: '2px solid', borderColor: filters.ownership === o ? '#2563eb' : '#e2e8f0',
              background: filters.ownership === o ? '#2563eb' : 'white',
              color: filters.ownership === o ? 'white' : '#475569', transition: 'all 0.2s'
            }}>{o}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Rating</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['4', '3', '2'].map(r => (
            <button key={r} onClick={() => handleChange('rating', filters.rating === r ? '' : r)} style={{
              padding: '8px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              border: '2px solid', borderColor: filters.rating === r ? '#2563eb' : '#e2e8f0',
              background: filters.rating === r ? '#2563eb' : 'white',
              color: filters.rating === r ? 'white' : '#475569', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px'
            }}>{r}+ <span style={{ color: '#f59e0b' }}>★</span></button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Fees Range (per year)</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="number" placeholder="Min" value={filters.feesMin} onChange={(e) => handleChange('feesMin', e.target.value)} style={{
            flex: 1, padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', outline: 'none'
          }} />
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>to</span>
          <input type="number" placeholder="Max" value={filters.feesMax} onChange={(e) => handleChange('feesMax', e.target.value)} style={{
            flex: 1, padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', outline: 'none'
          }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Sort By</label>
        <select value={filters.sort} onChange={(e) => handleChange('sort', e.target.value)} style={{
          width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', outline: 'none', background: 'white'
        }}>
          <option value="ranking">Top Ranked</option>
          <option value="rating">Highest Rated</option>
          <option value="fees_asc">Fees: Low to High</option>
          <option value="fees_desc">Fees: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
