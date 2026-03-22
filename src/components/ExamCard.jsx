import { Link } from 'react-router-dom';

const ExamCard = ({ exam }) => {
  return (
    <Link to={`/exams/${exam.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease', cursor: 'pointer', height: '100%'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{
            width: '60px', height: '60px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: 800 }}>{exam.name?.slice(0, 2).toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>{exam.name}</h3>
            {exam.fullName && <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>{exam.fullName}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {exam.conductingBody && (
                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{exam.conductingBody}</span>
              )}
              {exam.examLevel && (
                <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{exam.examLevel}</span>
              )}
            </div>
          </div>
        </div>
        {exam.dates?.examDate && (
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Exam Date</span>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                {new Date(exam.dates.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <span style={{
              background: exam.status === 'upcoming' ? '#fef3c7' : exam.status === 'completed' ? '#f1f5f9' : '#d1fae5',
              color: exam.status === 'upcoming' ? '#92400e' : exam.status === 'completed' ? '#475569' : '#065f46',
              padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize'
            }}>{exam.status}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ExamCard;
