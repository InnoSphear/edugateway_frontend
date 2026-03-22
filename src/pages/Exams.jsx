import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ExamCard from '../components/ExamCard';
import { examAPI } from '../utils/api';

const Exams = () => {
  const [searchParams] = useSearchParams();
  const [exams, setExams] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        const res = await examAPI.getAll(params);
        setExams(res.data.exams);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error('Failed to fetch exams:', err);
      }
      setLoading(false);
    };
    fetchExams();
  }, [searchParams]);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Entrance Exams in India</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Stay updated with exam dates, eligibility, syllabus, and more</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {loading ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ height: '150px', background: '#e2e8f0', borderRadius: '16px' }} />) : exams.map(exam => <ExamCard key={exam._id} exam={exam} />)}
      </div>

      {exams.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
          <h3 style={{ color: '#64748b' }}>No exams found</h3>
        </div>
      )}
    </div>
  );
};

export default Exams;
