import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', fullName: '', conductingBody: '', examLevel: 'National', status: 'active' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchExams();
  }, [navigate]);

  const fetchExams = async () => {
    try { const res = await api.get('/admin/exams'); setExams(res.data); }
    catch (err) { console.error('Failed to fetch exams:', err); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) await api.put(`/admin/exams/${formData._id}`, formData);
      else await api.post('/admin/exams', formData);
      setFormData({ name: '', slug: '', fullName: '', conductingBody: '', examLevel: 'National', status: 'active' });
      setShowForm(false);
      fetchExams();
    } catch (err) { alert('Failed to save exam'); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete this exam?')) return; try { await api.delete(`/admin/exams/${id}`); fetchExams(); } catch (err) { alert('Failed to delete exam'); } };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Exams Management</h1>
        <button onClick={() => { setFormData({ name: '', slug: '', fullName: '', conductingBody: '', examLevel: 'National', status: 'active' }); setShowForm(!showForm); }} style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add Exam</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <input type="text" placeholder="Exam Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
            <input type="text" placeholder="Conducting Body" value={formData.conductingBody} onChange={(e) => setFormData({ ...formData, conductingBody: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }} />
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <select value={formData.examLevel} onChange={(e) => setFormData({ ...formData, examLevel: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white' }}><option value="National">National</option><option value="State">State</option><option value="University">University</option></select>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', background: 'white' }}><option value="active">Active</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select>
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
            <tr><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Exam</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Conducting Body</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Level</th><th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Status</th><th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Actions</th></tr>
          </thead>
          <tbody>
            {exams.map(exam => (
              <tr key={exam._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px' }}><p style={{ fontWeight: 600, color: '#0f172a' }}>{exam.name}</p><p style={{ fontSize: '12px', color: '#64748b' }}>{exam.fullName}</p></td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{exam.conductingBody || '-'}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{exam.examLevel}</td>
                <td style={{ padding: '14px 16px' }}><span style={{ background: exam.status === 'active' ? '#d1fae5' : '#fef3c7', color: exam.status === 'active' ? '#065f46' : '#92400e', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>{exam.status}</span></td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}><button onClick={() => handleDelete(exam._id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminExams;
