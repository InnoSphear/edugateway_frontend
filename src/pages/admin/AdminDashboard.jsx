import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/admin/login'); return; }
    fetchDashboard();
  }, [navigate]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Welcome back! Here's an overview of your platform.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Total Colleges', value: stats?.stats?.colleges || 0, color: '#2563eb', icon: '🏫' },
          { label: 'Total Streams', value: stats?.stats?.streams || 0, color: '#10b981', icon: '📚' },
          { label: 'Total Courses', value: stats?.stats?.courses || 0, color: '#8b5cf6', icon: '🎓' },
          { label: 'Total Exams', value: stats?.stats?.exams || 0, color: '#ec4899', icon: '📝' },
          { label: 'Total Blogs', value: stats?.stats?.blogs || 0, color: '#84cc16', icon: '📝' },
          { label: 'Total Leads', value: stats?.stats?.leads || 0, color: '#f97316', icon: '👥' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `4px solid ${stat.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px' }}>{stat.icon}</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{stat.value}</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Recent Leads</h2>
            <Link to="/admin/leads" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats?.recentLeads?.length > 0 ? stats.recentLeads.map(lead => (
              <div key={lead._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#f8fafc', borderRadius: '10px' }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{lead.name}</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>{lead.phone} {lead.course && `• ${lead.course}`}</p>
                </div>
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'capitalize' }}>{lead.status}</span>
              </div>
            )) : <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>No leads yet</p>}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Leads by Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats?.leadsByStatus?.map(s => (
              <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '14px', color: '#475569', textTransform: 'capitalize' }}>{s._id}</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{s.count}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', padding: '16px', background: '#eff6ff', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb' }}>{stats?.leadsThisWeek || 0}</p>
            <p style={{ fontSize: '12px', color: '#2563eb' }}>Leads this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
