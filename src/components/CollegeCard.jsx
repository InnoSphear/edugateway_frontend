import { Link } from 'react-router-dom';
import { getCollegeRouteParam, normalizeCollege, resolveMediaUrl } from '../utils/content';
import { openCounsellingPopup } from '../utils/popup';

const CollegeCard = ({ college }) => {
  const item = normalizeCollege(college);
  const minFee = item.course?.[0]?.fee || item.totalFees || 'N/A';
  const coverImage = resolveMediaUrl(item.image?.[0], 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
  const routeParam = getCollegeRouteParam(item);

  return (
    <Link to={`/colleges/${routeParam}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'white', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
        transition: 'all 0.3s ease', cursor: 'pointer', height: '100%', border: '1px solid rgba(148,163,184,0.16)',
        display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 26px 70px rgba(15,23,42,0.14)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.22)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 20px 60px rgba(15,23,42,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.16)'; }}
      >
        <div style={{ position: 'relative', height: '180px', background: '#f8fafc' }}>
          <img src={coverImage} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.72))' }} />

          <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255,255,255,0.96)', padding: '4px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(15,23,42,0.12)' }}>
            {item.logo ? (
               <img src={item.logo} alt="logo" style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '10px', background: 'white' }} />
            ) : (
               <div style={{ width: '44px', height: '44px', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px' }}>{item.name[0]}</div>
            )}
          </div>

          <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
            {item.category && <span style={{ background: '#f97316', color: 'white', padding: '7px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>{item.category}</span>}
          </div>

          <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '18px', color: 'white' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.3, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', opacity: 0.95 }}>
              <span>{item.location?.city}{item.location?.state ? `, ${item.location.state}` : ''}</span>
              <span>{item.rating}/5</span>
              {item.ranking?.rank ? <span>{item.ranking.authority} #{item.ranking.rank}</span> : null}
            </div>
          </div>
        </div>

        <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            {item.course?.slice(0, 2).map((c, i) => (
              <span key={i} style={{ background: '#fff4eb', color: '#c2410c', padding: '6px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>{c.courseName}</span>
            ))}
            {item.course?.length > 2 && <span style={{ background: '#f8fafc', color: '#334155', padding: '6px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>+{item.course.length - 2} More</span>}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fees</span>
              <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{minFee}</p>
            </div>
            {item.averagePlacement && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg Package</span>
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#0f766e' }}>{item.averagePlacement}</p>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '18px' }}>
            <button style={{ background: 'transparent', color: '#f97316', border: '1px solid #fdba74', padding: '10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { e.target.style.background = '#fff7ed'; e.target.style.borderColor = '#fb923c'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = '#fdba74'; }}
              onClick={e => { e.preventDefault(); if (item.brochureUrl) window.open(item.brochureUrl, '_blank', 'noopener,noreferrer'); }}
            >Brochure</button>
            <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => e.target.style.background = '#1e293b'}
              onMouseLeave={e => e.target.style.background = '#0f172a'}
              onClick={e => { e.preventDefault(); openCounsellingPopup({ course: item.course?.[0]?.courseName || '', city: item.location?.city || '' }); }}
            >Apply Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
