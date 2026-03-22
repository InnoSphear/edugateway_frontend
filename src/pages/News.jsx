import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { newsAPI } from '../utils/api';

const News = () => {
  const [searchParams] = useSearchParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        const res = await newsAPI.getAll(params);
        setNews(res.data.news);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
      setLoading(false);
    };
    fetchNews();
  }, [searchParams]);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Education News</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Latest updates on admissions, exams, results, and more</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {loading ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ height: '280px', background: '#e2e8f0', borderRadius: '16px' }} />) : news.map(item => <NewsCard key={item._id} news={item} />)}
      </div>

      {news.length === 0 && !loading && <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}><h3 style={{ color: '#64748b' }}>No news found</h3></div>}
    </div>
  );
};

export default News;
