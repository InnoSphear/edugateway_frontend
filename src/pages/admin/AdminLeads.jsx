import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminLeads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', search: '' });

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (filter.status) params.status = filter.status;
      if (filter.search) params.search = filter.search;
      const res = await api.get('/admin/leads', { params });
      setLeads(res.data.leads);
      setPagination(res.data.pagination);
    } catch (err) { console.error('Failed to fetch leads:', err); }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    try { await api.put(`/admin/leads/${id}`, { status }); fetchLeads(); }
    catch (err) { alert('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try { await api.delete(`/admin/leads/${id}`); fetchLeads(); }
    catch (err) { alert('Failed to delete lead'); }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Leads Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Search..." value={filter.search} onChange={(e) => setFilter(f => ({ ...f, search: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && fetchLeads()} style={{ padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          <select value={filter.status} onChange={(e) => { setFilter(f => ({ ...f, status: e.target.value })); fetchLeads(); }} style={{ padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', background: 'white' }}>
            <option value="">All Status</option>
            <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="converted">Converted</option><option value="lost">Lost</option>
          </select>
          <button onClick={() => fetchLeads()} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>Search</button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Name</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Contact</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Interest</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Date</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{lead.name}</td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}><p>{lead.phone}</p><p style={{ fontSize: '12px', color: '#64748b' }}>{lead.email}</p></td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: '#475569' }}>{lead.course || '-'} {lead.city && `(${lead.city})`}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                <td style={{ padding: '14px 16px' }}>
                  <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)} style={{ padding: '6px 10px', borderRadius: '8px', fontSize: '12px', border: '2px solid #e2e8f0', background: 'white' }}>
                    <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="converted">Converted</option><option value="lost">Lost</option>
                  </select>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(lead._id)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No leads found</p>}
      </div>
    </div>
  );
};

export default AdminLeads;
