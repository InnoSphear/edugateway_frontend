import { useState, useEffect, useCallback } from 'react';
import { leadAPI } from '../utils/api';

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const showPopup = useCallback(() => {
    if (!localStorage.getItem('leadPopupShown')) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('leadPopupShown', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !localStorage.getItem('leadPopupShown')) {
        setIsOpen(true);
        localStorage.setItem('leadPopupShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    showPopup();
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showPopup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill in name and phone number');
      return;
    }
    setLoading(true);
    try {
      await leadAPI.create(formData);
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', course: '', city: '' });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '480px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'fadeIn 0.3s ease' }}>
        <button onClick={() => setIsOpen(false)} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.1)',
          border: 'none', cursor: 'pointer', color: '#64748b', width: '36px', height: '36px',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(0,0,0,0.2)'; e.target.style.color = '#0f172a'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(0,0,0,0.1)'; e.target.style.color = '#64748b'; }}
        >
          <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', padding: '32px', borderRadius: '20px 20px 0 0', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg style={{ width: 32, height: 32, color: 'white' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Get Free Counseling!</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Fill your details and our expert will call you</p>
        </div>

        <div style={{ padding: '32px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ width: '72px', height: '72px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
                <svg style={{ width: 36, height: 36, color: 'white' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ color: '#64748b' }}>Our counselor will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required style={{
                  width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required style={{
                  width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" style={{
                  width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Course Interest</label>
                  <select name="course" value={formData.course} onChange={handleChange} style={{
                    width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer'
                  }}>
                    <option value="">Select Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MBBS">MBBS</option>
                    <option value="BBA">BBA</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Your city" style={{
                    width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                  }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', padding: '12px', background: '#fef2f2', borderRadius: '8px' }}>{error}</p>}

              <button type="submit" disabled={loading} style={{
                width: '100%', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px',
                fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 8px 20px rgba(37,99,235,0.3)'
              }}>
                {loading ? 'Submitting...' : 'Get Free Counseling'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '16px' }}>
                Your information is secure and will not be shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;
