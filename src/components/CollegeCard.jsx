import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

const CollegeCard = ({ college }) => {
  const getStreamNames = () => {
    if (!college.streams?.length) return 'Multiple Streams';
    return college.streams.slice(0, 2).map(s => s.name).join(', ');
  };

  const getCourseNames = () => {
    if (!college.courses?.length) return '';
    return college.courses.slice(0, 3).map(c => c.name).join(', ');
  };

  return (
    <Link to={`/colleges/${college.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease', cursor: 'pointer', height: '100%'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ position: 'relative', height: '160px', background: `linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)` }}>
          {college.thumbnail ? (
            <img src={college.thumbnail} alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '48px', fontWeight: 800, opacity: 0.3 }}>{college.name[0]}</span>
            </div>
          )}
          <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {college.featured && <span style={{ background: '#fbbf24', color: '#000', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Featured</span>}
            {college.popular && <span style={{ background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Popular</span>}
          </div>
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'white', padding: '6px 14px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <span style={{ color: '#f59e0b' }}>★</span>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{college.rating || '4.0'}</span>
          </div>
          {college.nirfRank && (
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#0f172a', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>
              NIRF #{college.nirfRank}
            </div>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '10px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{college.name}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <svg style={{ width: 14, height: 14, color: '#64748b' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{college.location?.city}, {college.location?.state}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{getStreamNames()}</span>
          </div>

          {college.courses?.length > 0 && (
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getCourseNames()}</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Fees (per year)</span>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{formatCurrency(college.fees?.min)} {college.fees?.max ? `- ${formatCurrency(college.fees.max)}` : ''}</p>
            </div>
            {college.placements?.avg ? (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Avg Package</span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>{formatCurrency(college.placements.avg)}</p>
              </div>
            ) : <span style={{ fontSize: '12px', color: '#94a3b8', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>{college.ownership}</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button style={{ background: '#f8fafc', color: '#f97316', border: '1px solid #fed7aa', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { e.target.style.background = '#fff7ed'; e.target.style.borderColor = '#fdba74'; }}
              onMouseLeave={e => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#fed7aa'; }}
              onClick={e => { e.preventDefault(); /* Handle brochure download */ }}
            >brochure</button>
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => e.target.style.background = '#ea580c'}
              onMouseLeave={e => e.target.style.background = '#f97316'}
              onClick={e => { e.preventDefault(); /* Handle Apply */ }}
            >Apply Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
