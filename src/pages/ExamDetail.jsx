import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { examAPI } from '../utils/api';
import { formatDate } from '../utils/helpers';
import { openCounsellingPopup } from '../utils/popup';

const ExamDetail = () => {
  const { slug } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const res = await examAPI.getBySlug(slug);
        setExam(res.data);
      } catch (err) {
        console.error('Failed to fetch exam:', err);
        setExam(null);
      }
      setLoading(false);
    };
    fetchExam();
  }, [slug]);

  if (loading) return <div className="container" style={{ paddingTop: '32px' }}><div style={{ height: '400px', background: '#e2e8f0', borderRadius: '20px' }} /></div>;
  if (!exam) return <div className="container" style={{ paddingTop: '32px', textAlign: 'center' }}>Exam not found</div>;

  return (
    <div className="container" style={{ paddingTop: '32px' }}>
      <div style={{ background: 'white', borderRadius: '28px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', marginBottom: '24px', border: '1px solid rgba(148,163,184,0.12)' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>{exam.name?.slice(0, 2).toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{exam.name}</h1>
            {exam.fullName && <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: 1.7 }}>{exam.fullName}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {exam.conductingBody && <span style={{ background: '#eff6ff', color: '#2563eb', padding: '7px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700 }}>{exam.conductingBody}</span>}
              <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '7px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700 }}>{exam.examLevel}</span>
              <span style={{ background: exam.status === 'upcoming' ? '#fef3c7' : '#d1fae5', color: exam.status === 'upcoming' ? '#92400e' : '#065f46', padding: '7px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, textTransform: 'capitalize' }}>{exam.status}</span>
            </div>
          </div>
          <button onClick={() => openCounsellingPopup()} style={{ background: '#f97316', color: 'white', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Get Counselling</button>
        </div>
      </div>

      <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Important Dates</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Registration Start', value: exam.dates?.registrationStart, highlight: false },
              { label: 'Registration End', value: exam.dates?.registrationEnd, highlight: false },
              { label: 'Exam Date', value: exam.dates?.examDate, highlight: true }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '12px', flexWrap: 'wrap' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.highlight ? '#2563eb' : '#0f172a', fontSize: '14px' }}>{item.value ? formatDate(item.value) : 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Exam Pattern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Mode', value: exam.pattern?.mode || 'Online' },
              { label: 'Duration', value: exam.pattern?.duration || '3 hours' },
              { label: 'Total Questions', value: exam.pattern?.totalQuestions || '100' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '12px', flexWrap: 'wrap' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '20px', padding: '28px', textAlign: 'center', color: 'white', marginTop: '28px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Need Help with Exam Preparation?</h3>
        <p style={{ opacity: 0.9, marginBottom: '20px' }}>Get study materials and guidance from experts</p>
        <button onClick={() => openCounsellingPopup()} style={{ background: '#f97316', color: 'white', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: 'none', cursor: 'pointer' }}>Get Counselling</button>
      </div>
    </div>
  );
};

export default ExamDetail;
