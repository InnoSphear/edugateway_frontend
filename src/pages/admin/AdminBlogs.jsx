import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Career', image: '', authorName: '' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    try { const res = await api.get('/admin/blogs'); setBlogs(res.data); }
    catch (err) { console.error('Failed to fetch blogs:', err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, author: { name: formData.authorName } };
      if (formData._id) await api.put(`/admin/blogs/${formData._id}`, data);
      else await api.post('/admin/blogs', data);
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: 'Career', image: '', authorName: '' });
      setShowForm(false);
      fetchBlogs();
    } catch (err) { alert('Failed to save blog'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this blog?')) return; try { await api.delete(`/admin/blogs/${id}`); fetchBlogs(); } catch (err) { alert('Failed to delete blog'); } };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Blog Management</h1>
          <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add Blog</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px' }} />
            <input type="text" placeholder="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px' }} />
            <textarea placeholder="Content *" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows="8" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px', resize: 'vertical' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white' }}><option value="Career">Career</option><option value="College Guide">College Guide</option><option value="Exams">Exams</option><option value="Admissions">Admissions</option><option value="Scholarships">Scholarships</option><option value="Tips">Tips</option></select>
              <input type="text" placeholder="Author Name" value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
              <input type="url" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>{formData._id ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: '#e2e8f0', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
            </div>
          </form>
        )}

        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {blogs.map(blog => (
            <div key={blog._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {blog.image && <img src={blog.image} alt="" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />}
                <div><p style={{ fontWeight: 600, color: '#0f172a', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</p><p style={{ fontSize: '12px', color: '#64748b' }}>{blog.category} • {blog.views || 0} views</p></div>
              </div>
              <button onClick={() => handleDelete(blog._id)} style={{ background: 'transparent', border: '2px solid #fecaca', color: '#dc2626', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminBlogs;
