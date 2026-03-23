import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminStreams = () => {
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchStreams();
  }, [navigate]);

  const fetchStreams = async () => {
    try { const res = await api.get('/admin/streams'); setStreams(res.data); }
    catch (err) { console.error('Failed to fetch streams:', err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) await api.put(`/admin/streams/${formData._id}`, formData);
      else await api.post('/admin/streams', formData);
      setFormData({ name: '', slug: '', description: '' });
      setShowForm(false);
      fetchStreams();
    } catch (err) { alert('Failed to save stream'); }
  };

  const handleEdit = (stream) => { setFormData(stream); setShowForm(true); };
  const handleDelete = async (id) => { if (!confirm('Delete this stream?')) return; try { await api.delete(`/admin/streams/${id}`); fetchStreams(); } catch (err) { alert('Failed to delete stream'); } };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Streams Management</h1>
        <button onClick={() => { setFormData({ name: '', slug: '', description: '' }); setShowForm(!showForm); }} style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add Stream</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Stream Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            <input type="text" placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>{formData._id ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {streams.map(stream => (
          <div key={stream._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 800 }}>{stream.name[0]}</div>
              <div><p style={{ fontWeight: 600, color: '#0f172a' }}>{stream.name}</p><p style={{ fontSize: '13px', color: '#64748b' }}>/{stream.slug}</p></div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => handleEdit(stream)} style={{ background: 'transparent', border: '2px solid #e2e8f0', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#475569' }}>Edit</button>
              <button onClick={() => handleDelete(stream._id)} style={{ background: 'transparent', border: '2px solid #fecaca', color: '#dc2626', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStreams;
