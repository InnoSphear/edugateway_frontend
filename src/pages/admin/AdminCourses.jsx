import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', stream: '', duration: '', degreeType: 'Bachelor', eligibility: '' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [coursesRes, streamsRes] = await Promise.all([api.get('/admin/courses'), api.get('/admin/streams')]);
      setCourses(coursesRes.data);
      setStreams(streamsRes.data);
    } catch (err) { console.error('Failed to fetch data:', err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) await api.put(`/admin/courses/${formData._id}`, formData);
      else await api.post('/admin/courses', formData);
      setFormData({ name: '', slug: '', description: '', stream: '', duration: '', degreeType: 'Bachelor', eligibility: '' });
      setShowForm(false);
      fetchData();
    } catch (err) { alert('Failed to save course'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this course?')) return; try { await api.delete(`/admin/courses/${id}`); fetchData(); } catch (err) { alert('Failed to delete course'); } };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Courses Management</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add Course</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="text" placeholder="Course Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            <select value={formData.stream} onChange={(e) => setFormData({ ...formData, stream: e.target.value })} required style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white', fontSize: '14px' }}>
              <option value="">Select Stream</option>
              {streams.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <input type="text" placeholder="Duration (e.g., 4 years)" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            <select value={formData.degreeType} onChange={(e) => setFormData({ ...formData, degreeType: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white', fontSize: '14px' }}><option value="Bachelor">Bachelor</option><option value="Master">Master</option><option value="Diploma">Diploma</option><option value="Certificate">Certificate</option></select>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>{formData._id ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: '#e2e8f0', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Course</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Stream</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Duration</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Type</th><th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Actions</th></tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{course.name}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{course.stream?.name || '-'}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{course.duration || '-'}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{course.degreeType}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}><button onClick={() => handleDelete(course._id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;
