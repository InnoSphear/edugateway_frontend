import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'All Colleges', path: '/colleges' },
    { label: 'Top Universities', path: '/colleges?sort=ranking' },
    { label: 'Exams', path: '/exams' },
    { label: 'News', path: '/news' },
    { label: 'Blog', path: '/blogs' },
  ];

  const streams = [
    { label: 'Engineering', path: '/streams/engineering' },
    { label: 'Management', path: '/streams/management' },
    { label: 'Medical', path: '/streams/medical' },
    { label: 'Science', path: '/streams/science' },
    { label: 'Commerce', path: '/streams/commerce' },
  ];

  return (
    <footer style={{ background: '#0f172a', color: 'white', marginTop: '80px' }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img src="/logo.png" alt="Education Gateway" style={{ width: '44px', height: '34px' }} />
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Education Gateway</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>
              Your trusted platform for discovering the best colleges, courses, and exams in India. Make informed decisions about your education journey.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'FB', color: '#1877f2' },
                { name: 'TW', color: '#1da1f2' },
                { name: 'IG', color: '#e4405f' },
                { name: 'LI', color: '#0a66c2' },
              ].map(social => (
                <a key={social.name} href="#" style={{
                  width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                  textDecoration: 'none', fontSize: '12px', fontWeight: 700, transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.target.style.background = social.color; e.target.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.transform = 'translateY(0)'; }}
                >{social.name}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map(link => (
                <li key={link.label} style={{ marginBottom: '12px' }}>
                  <Link to={link.path} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', color: 'white' }}>Top Streams</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {streams.map(stream => (
                <li key={stream.label} style={{ marginBottom: '12px' }}>
                  <Link to={stream.path} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{stream.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', color: 'white' }}>Contact Us</h4>
            <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 2 }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span>📧</span> support@educationgateway.com
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span>📞</span> +91 1234567890
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📍</span> New Delhi, India
              </p>
            </div>
            <div style={{ marginTop: '24px' }}>
              <h5 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'white' }}>Newsletter</h5>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Your email" style={{
                  flex: 1, padding: '12px 14px', borderRadius: '10px', border: 'none', fontSize: '14px',
                  outline: 'none', background: 'rgba(255,255,255,0.1)', color: 'white'
                }} />
                <button style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white', border: 'none', padding: '12px 18px', borderRadius: '10px',
                  cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                }}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>© 2024 Education Gateway. Developed by Digibuddy.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(link => (
              <a key={link} href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
