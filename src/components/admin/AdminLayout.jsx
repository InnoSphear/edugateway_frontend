import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import api from '../../utils/api';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin', color: '#2563eb' },
    { icon: '🏫', label: 'Colleges', path: '/admin/colleges', color: '#10b981' },
    { icon: '📚', label: 'Streams', path: '/admin/streams', color: '#8b5cf6' },
    { icon: '🎓', label: 'Courses', path: '/admin/courses', color: '#f59e0b' },
    { icon: '📝', label: 'Exams', path: '/admin/exams', color: '#ec4899' },
    { icon: '📰', label: 'News', path: '/admin/news', color: '#06b6d4' },
    { icon: '📝', label: 'Blogs', path: '/admin/blogs', color: '#84cc16' },
    { icon: '👥', label: 'Leads', path: '/admin/leads', color: '#f97316' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <aside style={{ width: '260px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '24px 16px', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '0 8px' }}>
          <img src="/logo.png" alt="Education Gateway" style={{ width: '36px', height: '28px' }} />
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#2563eb' }}>Admin</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
            <Link key={item.path} to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px',
              textDecoration: 'none', color: isActive ? item.color : '#475569', 
              background: isActive ? '#f1f5f9' : 'transparent',
              fontSize: '14px', fontWeight: isActive ? 600 : 500, transition: 'all 0.2s'
            }}
              onMouseEnter={e => { if (!isActive) { e.target.style.background = '#f1f5f9'; e.target.style.color = item.color; } }}
              onMouseLeave={e => { if (!isActive) { e.target.style.background = 'transparent'; e.target.style.color = '#475569'; } }}
            ><span style={{ fontSize: '18px' }}>{item.icon}</span>{item.label}</Link>
          )})}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
          <Link to="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', textDecoration: 'none', color: '#64748b', fontSize: '14px' }}>🌐 View Website</Link>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#dc2626', fontSize: '14px', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: '260px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
