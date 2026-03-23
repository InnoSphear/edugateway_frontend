import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  // Try to use the first course's fee
  const minFee = college.course && college.course.length > 0 ? college.course[0].fee : 'N/A';

  return (
    <Link to={`/colleges/${college._id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease', cursor: 'pointer', height: '100%', border: '1px solid #f1f5f9',
        display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
      >
        <div style={{ position: 'relative', height: '110px', background: '#f8fafc' }}>
          {college.image && college.image.length > 0 ? (
            <img src={college.image[0]} alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)' }}>
              <span style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>{college.name[0]}</span>
            </div>
          )}
          
          <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255,255,255,0.95)', padding: '2px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {college.logo ? (
               <img src={college.logo} alt="logo" style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '4px' }} />
            ) : (
               <div style={{ width: '30px', height: '30px', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>{college.name[0]}</div>
            )}
          </div>
          
          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
            {college.category && <span style={{ background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '9px', fontWeight: 700 }}>{college.category}</span>}
          </div>
        </div>

        <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{college.name}</h3>
          
          <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {college.course && college.course.slice(0, 2).map((c, i) => (
              <span key={i} style={{ background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>{c.courseName}</span>
            ))}
            {college.course?.length > 2 && <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>+{college.course.length - 2} More</span>}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '1px' }}>First Year Fee</span>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{minFee}</p>
            </div>
            {college.averagePlacement && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '1px' }}>Avg Package</span>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>{college.averagePlacement}</p>
              </div>
            )}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '12px' }}>
            <button style={{ background: 'transparent', color: '#f97316', border: '1px solid #fed7aa', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { e.target.style.background = '#fff7ed'; e.target.style.borderColor = '#fdba74'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = '#fed7aa'; }}
              onClick={e => { e.preventDefault(); }}
            >Brochure</button>
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => e.target.style.background = '#ea580c'}
              onMouseLeave={e => e.target.style.background = '#f97316'}
              onClick={e => { e.preventDefault(); }}
            >Apply Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
