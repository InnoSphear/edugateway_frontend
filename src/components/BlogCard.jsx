import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const BlogCard = ({ blog, variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <Link to={`/blogs/${blog.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: '16px' }}>
        <div style={{ width: '120px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
          {blog.image ? <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>{blog.category}</span>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</h4>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blogs/${blog.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease', height: '100%', display: 'flex', flexDirection: 'column'
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ height: '160px', overflow: 'hidden' }}>
          {blog.image ? <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} /> : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }} />}
        </div>
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', alignSelf: 'flex-start' }}>{blog.category}</span>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '12px 0', lineHeight: 1.4, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{blog.title}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', marginTop: 'auto' }}>
            <span>{blog.author?.name || 'Admin'}</span>
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
