import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Admission', image: '', source: '' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try { const res = await api.get('/admin/news'); setNews(res.data); }
    catch (err) { console.error('Failed to fetch news:', err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) await api.put(`/admin/news/${formData._id}`, formData);
      else await api.post('/admin/news', formData);
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: 'Admission', image: '', source: '' });
      setShowForm(false);
      fetchNews();
    } catch (err) { alert('Failed to save news'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this news?')) return; try { await api.delete(`/admin/news/${id}`); fetchNews(); } catch (err) { alert('Failed to delete news'); } };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>News Management</h1>
          <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add News</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px' }} />
            <input type="text" placeholder="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px' }} />
            <textarea placeholder="Content *" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows="5" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px', resize: 'vertical' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white' }}><option value="Admission">Admission</option><option value="Results">Results</option><option value="Government Updates">Government Updates</option><option value="Exams">Exams</option><option value="Scholarships">Scholarships</option><option value="Events">Events</option></select>
              <input type="text" placeholder="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
              <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>{formData._id ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: '#e2e8f0', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
            </div>
          </form>
        )}

        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {news.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {item.image && <img src={item.image} alt="" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />}
                <div><p style={{ fontWeight: 600, color: '#0f172a', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p><p style={{ fontSize: '12px', color: '#64748b' }}>{item.category} • {new Date(item.createdAt).toLocaleDateString('en-IN')}</p></div>
              </div>
              <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: '2px solid #fecaca', color: '#dc2626', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminNews;
