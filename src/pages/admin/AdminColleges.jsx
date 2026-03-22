import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminColleges = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchColleges();
  }, [navigate]);

  const fetchColleges = async () => {
    try {
      const res = await api.get('/admin/colleges');
      setColleges(res.data);
    } catch (err) { console.error('Failed to fetch colleges:', err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this college?')) return;
    try {
      await api.delete(`/admin/colleges/${id}`);
      fetchColleges();
    } catch (err) { alert('Failed to delete college'); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Colleges Management</h1>
          <Link to="/admin/colleges/new" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>+ Add College</Link>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>College</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Location</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Rating</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Fees</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map(college => (
                <tr key={college._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>{college.name[0]}</div>
                      <div>
                        <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{college.name}</p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>{college.ownership}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>{college.location?.city}, {college.location?.state}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>{college.rating} ⭐</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>{college.fees?.min ? `₹${college.fees.min.toLocaleString()}` : 'N/A'}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: college.status === 'active' ? '#d1fae5' : '#fee2e2', color: college.status === 'active' ? '#065f46' : '#991b1b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{college.status}</span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <Link to={`/colleges/${college.slug}`} target="_blank" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '13px', marginRight: '12px', fontWeight: 500 }}>View</Link>
                    <Link to={`/admin/colleges/${college._id}`} style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', marginRight: '12px', fontWeight: 500 }}>Edit</Link>
                    <button onClick={() => handleDelete(college._id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {colleges.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No colleges found</p>}
        </div>
      </main>
    </div>
  );
};

export default AdminColleges;
