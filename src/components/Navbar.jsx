import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { streams, user, setUser } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img src="/logo.png" alt="Education Gateway" style={{ width: '44px', height: '34px' }} />
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>Education Gateway</span>
            </Link>

            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: '24px' }}>
              {[
                { label: 'All Streams', path: '/streams' },
                { label: 'All Courses', path: '/courses' },
                { label: 'Engineering', path: '/streams/engineering' },
                { label: 'Management', path: '/streams/management' },
                { label: 'Medical', path: '/streams/medical' },
                { label: 'Design', path: '/streams/design' },
                { label: 'Explore', path: '/colleges' },
                { label: 'Online', path: '/online' }
              ].map(link => (
                <Link key={link.label} to={link.path} style={{
                  padding: '8px 14px', fontSize: '15px', fontWeight: 600,
                  color: '#1e293b', textDecoration: 'none', transition: 'all 0.2s', borderRadius: '6px'
                }}
                  onMouseEnter={e => { e.target.style.color = '#f97316'; e.target.style.background = '#fff7ed'; }}
                  onMouseLeave={e => { e.target.style.color = '#1e293b'; e.target.style.background = 'transparent'; }}
                >{link.label}</Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button style={{
                    background: '#f97316',
                    color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px',
                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',
                  }}
                    onMouseEnter={e => e.target.style.background = '#ea580c'}
                    onMouseLeave={e => e.target.style.background = '#f97316'}
                  >
                    <span>{user.name?.split(' ')[0]}</span>
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                    background: 'white', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    padding: '8px', minWidth: '180px', zIndex: 100, animation: 'slideDown 0.2s ease'
                  }}>
                    <Link to="/admin" style={{ display: 'block', padding: '12px 16px', color: '#374151', textDecoration: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}
                      onMouseEnter={e => e.target.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.target.style.background = 'transparent'}>Dashboard</Link>
                    <button onClick={handleLogout} style={{
                      width: '100%', textAlign: 'left', padding: '12px 16px', color: '#dc2626',
                      background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', fontSize: '14px'
                    }}>Logout</button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/admin/login" style={{
                    background: 'white', border: '1px solid #e2e8f0', color: '#0f172a', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px',
                    fontWeight: 600, fontSize: '14px', transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#cbd5e1'; }}
                    onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.borderColor = '#e2e8f0'; }}
                  >Log In</Link>
                  <Link to="/admin/login" className="desktop-only" style={{
                    background: '#f97316', color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px',
                    fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', border: 'none'
                  }}
                    onMouseEnter={e => e.target.style.background = '#ea580c'}
                    onMouseLeave={e => e.target.style.background = '#f97316'}
                  >Sign Up</Link>
                </>
              )}

              <button onClick={() => setMobileOpen(true)} className="mobile-only" style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg style={{ width: 24, height: 24, color: '#475569' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100 }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '85%', maxWidth: '360px', background: 'white', animation: 'slideDown 0.3s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Menu</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
                <svg style={{ width: 24, height: 24, color: '#64748b' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div style={{ padding: '16px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
              <Link to="/colleges" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', color: '#374151', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>All Colleges</Link>
              <Link to="/exams" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', color: '#374151', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>Exams</Link>
              <Link to="/news" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', color: '#374151', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>News</Link>
              <Link to="/blogs" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', color: '#374151', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>Blog</Link>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Menu</p>
                {[
                  { label: 'All Streams', path: '/streams' },
                  { label: 'All Courses', path: '/courses' },
                  { label: 'Engineering', path: '/streams/engineering' },
                  { label: 'Management', path: '/streams/management' },
                  { label: 'Medical', path: '/streams/medical' },
                  { label: 'Design', path: '/streams/design' },
                  { label: 'Explore', path: '/colleges' },
                  { label: 'Online', path: '/online' }
                ].map(link => (
                  <Link key={link.label} to={link.path} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '12px 0', color: '#475569', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid #f8fafc' }}>{link.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: '72px' }} />
    </>
  );
};

export default Navbar;
