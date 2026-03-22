import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const NewsCard = ({ news }) => {
  return (
    <Link to={`/news/${news.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease', height: '100%', display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ position: 'relative', height: '140px', overflow: 'hidden', flexShrink: 0 }}>
          {news.image ? <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }} />}
          {news.breaking && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px', background: '#dc2626', color: 'white',
              padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, animation: 'pulse 2s infinite'
            }}>BREAKING</span>
          )}
        </div>
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', alignSelf: 'flex-start' }}>{news.category}</span>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '12px 0', lineHeight: 1.4, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{news.title}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginTop: 'auto' }}>
            {news.source && <span style={{ fontWeight: 500 }}>{news.source}</span>}
            <span>{formatDate(news.publishedAt || news.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
