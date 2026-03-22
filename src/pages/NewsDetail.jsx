import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../utils/api';
import { formatDate } from '../utils/helpers';

const NewsDetail = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await newsAPI.getBySlug(slug);
        setNewsItem(res.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
      setLoading(false);
    };
    fetchNews();
  }, [slug]);

  if (loading) return <div className="container" style={{ padding: '40px' }}><div style={{ height: '400px', background: '#e2e8f0', borderRadius: '16px' }} /></div>;
  if (!newsItem) return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>News not found</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <Link to="/news" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>← Back to News</Link>
      
      <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{newsItem.category}</span>
      
      <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginTop: '16px', marginBottom: '16px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>{newsItem.title}</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
        {newsItem.source && <span>Source: {newsItem.source}</span>}
        <span>•</span>
        <span>{formatDate(newsItem.publishedAt || newsItem.createdAt)}</span>
      </div>

      {newsItem.image && <img src={newsItem.image} alt={newsItem.title} style={{ width: '100%', borderRadius: '16px', marginBottom: '32px', maxHeight: '400px', objectFit: 'cover' }} />}

      <div style={{ fontSize: '17px', lineHeight: 1.8, color: '#374151' }} dangerouslySetInnerHTML={{ __html: newsItem.content || newsItem.excerpt }} />

      <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', marginTop: '40px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Stay Updated</h4>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>Subscribe to our newsletter for more such updates</p>
        <Link to="/contact" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>Subscribe Now</Link>
      </div>
    </div>
  );
};

export default NewsDetail;
