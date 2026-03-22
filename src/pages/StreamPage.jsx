import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamAPI, collegeAPI } from '../utils/api';
import CollegeCard from '../components/CollegeCard';

const StreamPage = () => {
  const { slug } = useParams();
  const [stream, setStream] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [streamRes, collegeRes] = await Promise.all([
          streamAPI.getBySlug(slug),
          collegeAPI.getAll({ stream: slug })
        ]);
        setStream(streamRes.data);
        setColleges(collegeRes.data.colleges);
      } catch (err) {
        console.error('Failed to fetch stream:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '40px' }}><div style={{ height: '300px', background: '#e2e8f0', borderRadius: '16px' }} /></div>;

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '20px', padding: '48px', marginBottom: '40px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '12px' }}>{stream?.name || slug}</h1>
        <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>{stream?.description || `Explore top ${stream?.name || 'stream'} colleges in India with rankings, fees, and placement details`}</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Top {stream?.name || slug} Colleges</h2>
        <p style={{ color: '#64748b' }}>{colleges.length} colleges found</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {colleges.map(college => <CollegeCard key={college._id} college={college} />)}
      </div>

      {colleges.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
          <h3 style={{ color: '#64748b' }}>No colleges found for this stream</h3>
        </div>
      )}
    </div>
  );
};

export default StreamPage;
