import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collegeAPI } from '../utils/api';
import { formatCurrency, formatDate } from '../utils/helpers';

const CollegeDetail = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const res = await collegeAPI.getBySlug(slug);
        setCollege(res.data);
      } catch (err) {
        console.error('Failed to fetch college:', err);
      }
      setLoading(false);
    };
    fetchCollege();
  }, [slug]);

  if (loading) {
    return <div className="container" style={{ padding: '40px' }}><div style={{ height: '400px', background: '#e2e8f0', borderRadius: '16px', animation: 'pulse 2s infinite' }} /></div>;
  }

  if (!college) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}><h2>College not found</h2></div>;
  }

  const tabs = ['overview', 'courses', 'admissions', 'placements', 'facilities'];

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <div style={{ height: '300px', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', position: 'relative' }}>
          {college.thumbnail && <img src={college.thumbnail} alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>{college.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📍 {college.location?.city}, {college.location?.state}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>⭐ {college.rating} / 5</span>
                  {college.established && <span>🏛️ Est. {college.established}</span>}
                  <span style={{ background: college.ownership === 'Government' ? '#10b981' : '#3b82f6', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{college.ownership}</span>
                </div>
              </div>
              {college.nirfRank && <div style={{ background: '#0f172a', color: 'white', padding: '8px 16px', borderRadius: '10px' }}>NIRF Rank #{college.nirfRank}</div>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', padding: '16px 24px', borderBottom: '1px solid #f1f5f9', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 20px', borderRadius: '24px', border: 'none', cursor: 'pointer', fontWeight: 600,
              fontSize: '14px', textTransform: 'capitalize', background: activeTab === tab ? '#2563eb' : '#f1f5f9',
              color: activeTab === tab ? 'white' : '#475569', transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}>{tab}</button>
          ))}
        </div>

        <div style={{ padding: '32px' }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>About {college.name}</h2>
              <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>{college.description || `${college.name} is a premier institution offering quality education in ${college.location?.city}, ${college.location?.state}. The college provides excellent infrastructure, experienced faculty, and outstanding placement opportunities.`}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb' }}>{formatCurrency(college.fees?.min)}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Starting Fees</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>{college.placements?.avg ? formatCurrency(college.placements.avg) : 'N/A'}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Avg Package</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>{college.placements?.highest ? formatCurrency(college.placements.highest) : 'N/A'}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Highest Package</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#8b5cf6' }}>{college.nirfRank || 'N/A'}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>NIRF Rank</p>
                </div>
              </div>

              {college.streams?.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Streams Offered</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {college.streams.map(s => <span key={s._id} style={{ background: '#eff6ff', color: '#2563eb', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>{s.name}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Courses & Fees</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {college.courses?.map(course => (
                  <div key={course._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#f8fafc', borderRadius: '14px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{course.name}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>{course.duration} • {course.eligibility || 'As per university norms'}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>{course.fees?.min ? formatCurrency(course.fees.min) : 'N/A'}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8' }}>per year</p>
                    </div>
                  </div>
                ))}
                {(!college.courses || college.courses.length === 0) && <p style={{ color: '#64748b' }}>No courses information available</p>}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Placement Statistics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '24px', borderRadius: '14px', textAlign: 'center', color: 'white' }}>
                  <p style={{ fontSize: '32px', fontWeight: 800 }}>{college.placements?.avg ? formatCurrency(college.placements.avg) : 'N/A'}</p>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>Average Package</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', padding: '24px', borderRadius: '14px', textAlign: 'center', color: 'white' }}>
                  <p style={{ fontSize: '32px', fontWeight: 800 }}>{college.placements?.highest ? formatCurrency(college.placements.highest) : 'N/A'}</p>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>Highest Package</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '24px', borderRadius: '14px', textAlign: 'center', color: 'white' }}>
                  <p style={{ fontSize: '32px', fontWeight: 800 }}>{college.placements?.percentagePlaced || '85'}%</p>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>Students Placed</p>
                </div>
              </div>
              {college.placements?.topRecruiters?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Top Recruiters</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {college.placements.topRecruiters.map((r, i) => <span key={i} style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>{r}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admissions' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Admission Process</h2>
              <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '24px' }}>{college.eligibility || 'Admissions are based on entrance exams and merit. Students are advised to check the official website for detailed admission criteria and important dates.'}</p>
              {college.examsAccepted?.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Accepted Exams</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {college.examsAccepted.map(e => <span key={e._id} style={{ background: '#fef3c7', color: '#92400e', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}>{e.name}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'facilities' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Campus Facilities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {(college.facilities || ['Library', 'Labs', 'Sports Complex', 'Hostel', 'Cafeteria', 'Wi-Fi Campus', 'Medical Facility', 'Transportation']).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '20px' }}>🏛️</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '20px', padding: '32px', textAlign: 'center', color: 'white' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Have Questions About {college.name}?</h3>
        <p style={{ opacity: 0.9, marginBottom: '20px' }}>Get answers from our experts. Fill your details and we'll call you!</p>
        <Link to="/contact" style={{
          background: 'white', color: '#2563eb', padding: '14px 32px', borderRadius: '12px',
          textDecoration: 'none', fontWeight: 700, display: 'inline-block',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>Get Free Counseling</Link>
      </div>
    </div>
  );
};

export default CollegeDetail;
