import { Link } from 'react-router-dom';

const footerLinks = {
  Explore: [
    { label: 'All Colleges', path: '/colleges' },
    { label: 'Exams', path: '/exams' },
    { label: 'News', path: '/news' },
    { label: 'Blogs', path: '/blogs' },
  ],
  Categories: [
    { label: 'Engineering Colleges', path: '/colleges?search=engineering' },
    { label: 'Medical Colleges', path: '/colleges?search=medical' },
    { label: 'MBA Colleges', path: '/colleges?search=mba' },
    { label: 'Private Medical Colleges', path: '/colleges?search=private%20medical' },
  ],
};

const Footer = () => (
  <footer style={{ marginTop: '72px', background: 'linear-gradient(180deg, #111827, #0f172a)', color: 'white' }}>
    <div className="container" style={{ paddingTop: '56px', paddingBottom: '28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src="/logo.png" alt="Education Gateway" style={{ width: '48px', height: '48px', borderRadius: '14px', objectFit: 'contain', background: 'white' }} />
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>Education Gateway</div>
              <div style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>Empowering education decisions</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
            A responsive discovery layer for colleges, admissions, fees, exams, blogs and education news.
          </p>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '14px' }}>{section}</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {links.map((link) => (
                <Link key={link.label} to={link.path} style={{ color: '#cbd5e1', fontSize: '0.94rem' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '14px' }}>Helpdesk</h4>
          <div style={{ display: 'grid', gap: '10px', color: '#cbd5e1', fontSize: '0.94rem' }}>
            <span>Regular Helpdesk: +91 95997 49001</span>
            <span>Online Helpdesk: +91 97178 19001</span>
            <span>Email: support@educationgateway.com</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '34px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.86rem' }}>
        <span>© 2026 Education Gateway</span>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/updates">Updates</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
