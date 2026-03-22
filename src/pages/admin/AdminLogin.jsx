import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  if (localStorage.getItem('token')) return <Navigate to="/admin" />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070") center/cover no-repeat', opacity: 0.1, mixBlendMode: 'overlay' }} />
      <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', animation: 'fadeIn 0.4s ease', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/logo.png" alt="Education Gateway" style={{ width: '70px', height: '54px', marginBottom: '20px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Admin Portal</h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{
              width: '100%', padding: '16px 20px', border: '2px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc',
              fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
            }} onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.background = '#fff'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; }} />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{
              width: '100%', padding: '16px 20px', border: '2px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc',
              fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
            }} onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.background = '#fff'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; }} />
          </div>

          {error && <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '24px', textAlign: 'center', fontWeight: 500 }}>{error}</div>}

          <button type="submit" disabled={loading} style={{
            width: '100%', background: loading ? '#fb923c' : '#f97316',
            color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '16px',
            fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 10px 25px -5px rgba(249,115,22,0.4)', transition: 'all 0.2s', letterSpacing: '0.5px'
          }} onMouseEnter={e => !loading && (e.target.style.transform = 'translateY(-2px)')} onMouseLeave={e => !loading && (e.target.style.transform = 'translateY(0)')}>{loading ? 'Authenticating...' : 'Sign In'}</button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '32px' }}>Default credentials are pre-configured for administrators.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
