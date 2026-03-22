import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminCollegeForm = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split('/').pop();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    name: '', slug: '', description: '', ownership: 'Private',
    location: { city: '', state: '' },
    fees: { min: '', max: '' }, rating: '', streams: [], facilities: [],
    thumbnail: '', established: '', nirfRank: '', featured: false, popular: false,
    placements: { avg: '', highest: '', percentagePlaced: '' },
    eligibility: '', cutoff: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    if (isEdit && id !== 'new') fetchCollege();
  }, [navigate, id]);

  const fetchCollege = async () => {
    try {
      const res = await api.get(`/colleges/id/${id}`);
      const c = res.data;
      setFormData({
        name: c.name || '', slug: c.slug || '', description: c.description || '', ownership: c.ownership || 'Private',
        location: { city: c.location?.city || '', state: c.location?.state || '' },
        fees: { min: c.fees?.min || '', max: c.fees?.max || '' },
        rating: c.rating || '', facilities: c.facilities || [],
        thumbnail: c.thumbnail || '', established: c.established || '', nirfRank: c.nirfRank || '', featured: c.featured || false, popular: c.popular || false,
        placements: { avg: c.placements?.avg || '', highest: c.placements?.highest || '', percentagePlaced: c.placements?.percentagePlaced || '' },
        eligibility: c.eligibility || '', cutoff: c.cutoff || ''
      });
    } catch (err) { console.error('Failed to fetch college:', err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        fees: { min: Number(formData.fees.min) || 0, max: Number(formData.fees.max) || 0 },
        rating: Number(formData.rating) || 0, established: Number(formData.established) || null, nirfRank: Number(formData.nirfRank) || null,
        placements: { avg: Number(formData.placements.avg) || 0, highest: Number(formData.placements.highest) || 0, percentagePlaced: Number(formData.placements.percentagePlaced) || 0 }
      };
      if (isEdit) await api.put(`/admin/colleges/${id}`, data);
      else await api.post('/admin/colleges', data);
      navigate('/admin/colleges');
    } catch (err) { alert('Failed to save college'); }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>{isEdit ? 'Edit College' : 'Add New College'}</h1>
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>College Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>City *</label><input type="text" name="location.city" value={formData.location.city} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>State *</label><input type="text" name="location.state" value={formData.location.state} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Ownership</label><select name="ownership" value={formData.ownership} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', background: 'white' }}><option value="Government">Government</option><option value="Private">Private</option><option value="Deemed">Deemed</option></select></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Rating (0-5)</label><input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Min Fees</label><input type="number" name="fees.min" value={formData.fees.min} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Max Fees</label><input type="number" name="fees.max" value={formData.fees.max} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
          </div>
          <div style={{ marginTop: '20px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }} /></div>
          <div style={{ marginTop: '20px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Thumbnail URL</label><input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /><span style={{ fontSize: '14px', color: '#374151' }}>Featured</span></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} /><span style={{ fontSize: '14px', color: '#374151' }}>Popular</span></label>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => navigate('/admin/colleges')} style={{ padding: '12px 24px', borderRadius: '10px', border: '2px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>{loading ? 'Saving...' : 'Save College'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCollegeForm;
