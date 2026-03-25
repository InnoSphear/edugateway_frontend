import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../utils/api';
import { formatDate } from '../utils/helpers';
import { openCounsellingPopup } from '../utils/popup';

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
        setNewsItem(null);
      }
      setLoading(false);
    };
    fetchNews();
  }, [slug]);

  if (loading) return <div className="article-shell"><div style={{ height: '400px', background: '#e2e8f0', borderRadius: '20px' }} /></div>;
  if (!newsItem) return <div className="article-shell" style={{ textAlign: 'center' }}>News not found</div>;

  return (
    <div className="article-shell">
      <Link to="/news" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>Back to News</Link>

      <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{newsItem.category}</span>

      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginTop: '16px', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.03em' }}>{newsItem.title}</h1>

      <div className="meta-wrap" style={{ marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
        {newsItem.source && <span>Source: {newsItem.source}</span>}
        <span>{formatDate(newsItem.publishedAt || newsItem.createdAt)}</span>
      </div>

      {newsItem.image && <img src={newsItem.image} alt={newsItem.title} style={{ width: '100%', borderRadius: '20px', marginBottom: '32px', maxHeight: '420px', objectFit: 'cover' }} />}

      <div style={{ fontSize: '17px', lineHeight: 1.9, color: '#374151', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: newsItem.content || newsItem.excerpt }} />

      <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', marginTop: '40px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Stay Updated</h4>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>Subscribe to our newsletter for more such updates</p>
        <button onClick={() => openCounsellingPopup()} style={{ background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: 'none', cursor: 'pointer' }}>Get Counselling</button>
      </div>
    </div>
  );
};

export default NewsDetail;
