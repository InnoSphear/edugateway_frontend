import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { openCounsellingPopup } from '../utils/popup';

const primaryLinks = [

  { label: 'Engineering', path: '/colleges?search=engineering' },
  { label: 'Management', path: '/colleges?search=management' },
 
  { label: 'Explore', path: '/colleges' },
  { label: 'Exams', path: '/exams' },
  { label: 'News', path: '/news' },
  { label: 'Blogs', path: '/blogs' },
];

const Navbar = () => {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,249,244,0.92)' : 'rgba(255,249,244,0.82)',
        borderBottom: '1px solid rgba(148,163,184,0.18)',
        backdropFilter: 'blur(18px)',
        boxShadow: scrolled ? '0 18px 40px rgba(15,23,42,0.08)' : 'none',
      }}>
        <div className="container">
          <div style={{ minHeight: '78px', display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'space-between' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="Education Gateway" style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'contain', background: 'white', boxShadow: '0 10px 24px rgba(15,23,42,0.08)' }} />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Education Gateway</div>
                <div className="desktop-only" style={{ fontSize: '0.74rem', color: '#64748b' }}>Explore colleges, exams and admissions</div>
              </div>
            </Link>

            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {primaryLinks.map((link) => (
                <Link key={link.label} to={link.path} style={{
                  padding: '10px 14px',
                  borderRadius: '999px',
                  color: '#334155',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#fff1e8';
                  e.target.style.color = '#c2410c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#334155';
                }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user ? (
                <>
                  <Link to="/admin" style={{ padding: '10px 16px', borderRadius: '999px', background: '#fff', border: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.9rem' }}>Dashboard</Link>
                  <button onClick={handleLogout} style={{ padding: '10px 16px', borderRadius: '999px', border: 'none', background: '#0f172a', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/admin/login" className="desktop-only" style={{ padding: '10px 16px', borderRadius: '999px', background: '#fff', border: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.9rem' }}>Login</Link>
                  <button onClick={() => openCounsellingPopup()} className="desktop-only" style={{ padding: '10px 16px', borderRadius: '999px', background: '#f97316', color: 'white', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>Get Counselling</button>
                </>
              )}

              <button className="mobile-only" onClick={() => setMobileOpen(true)} style={{ background: 'white', border: '1px solid #e2e8f0', width: '42px', height: '42px', borderRadius: '12px', cursor: 'pointer', fontSize: '1.1rem' }}>
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(15,23,42,0.44)' }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'min(88vw, 360px)', background: '#fffaf5', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '1.05rem' }}>Menu</strong>
              <button onClick={() => setMobileOpen(false)} style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>✕</button>
            </div>
            {primaryLinks.map((link) => (
              <Link key={link.label} to={link.path} onClick={() => setMobileOpen(false)} style={{ padding: '12px 14px', borderRadius: '14px', background: 'white', border: '1px solid rgba(148,163,184,0.16)', fontWeight: 600, color: '#334155' }}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => { setMobileOpen(false); openCounsellingPopup(); }} style={{ marginTop: '8px', padding: '12px 14px', borderRadius: '14px', background: '#f97316', color: 'white', fontWeight: 700, textAlign: 'center', border: 'none', cursor: 'pointer' }}>
              Talk to Expert
            </button>
            <Link to="/admin/login" className="desktop-only" style={{ padding: '10px 16px', borderRadius: '999px', background: '#fff', border: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.9rem' }}>Login</Link>
              
          </div>
        </div>
      )}

      <div style={{ height: '78px' }} />
    </>
  );
};

export default Navbar;
