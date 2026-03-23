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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '380px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', animation: 'fadeIn 0.3s ease' }}>
        <button onClick={() => setIsOpen(false)} style={{
          position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.1)',
          border: 'none', cursor: 'pointer', color: '#ecf0f1', width: '28px', height: '28px',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(0,0,0,0.2)'; e.target.style.color = '#fff'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(0,0,0,0.1)'; e.target.style.color = '#ecf0f1'; }}
        >
          <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', padding: '24px 20px', borderRadius: '16px 16px 0 0', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg style={{ width: 24, height: 24, color: 'white' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Free Counseling!</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>Fill details and our expert will call you</p>
        </div>

        <div style={{ padding: '20px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
                <svg style={{ width: 30, height: 30, color: 'white' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Our counselor will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" required style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <select name="course" value={formData.course} onChange={handleChange} style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer'
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
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px', padding: '8px', background: '#fef2f2', borderRadius: '6px' }}>{error}</p>}

              <button type="submit" disabled={loading} style={{
                width: '100%', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px',
                fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(37,99,235,0.2)'
              }}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '12px' }}>
                Your information is secure.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;
