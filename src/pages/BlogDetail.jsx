import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import { formatDate } from '../utils/helpers';
import { openCounsellingPopup } from '../utils/popup';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await blogAPI.getBySlug(slug);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setBlog(null);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="article-shell"><div style={{ height: '400px', background: '#e2e8f0', borderRadius: '20px' }} /></div>;
  if (!blog) return <div className="article-shell" style={{ textAlign: 'center' }}>Blog not found</div>;

  return (
    <div className="article-shell">
      <Link to="/blogs" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>Back to Blogs</Link>

      <span style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{blog.category}</span>

      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginTop: '16px', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.03em' }}>{blog.title}</h1>

      <div className="meta-wrap" style={{ marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
        <span>By {blog.author?.name || 'Admin'}</span>
        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        <span>{blog.readTime || '5 min read'}</span>
      </div>

      {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '20px', marginBottom: '32px', maxHeight: '420px', objectFit: 'cover' }} />}

      <div style={{ fontSize: '17px', lineHeight: 1.9, color: '#374151', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }} />

      {blog.tags?.length > 0 && (
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Tags</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {blog.tags.map((tag, i) => <span key={i} style={{ background: '#f1f5f9', padding: '8px 14px', borderRadius: '999px', fontSize: '13px', color: '#475569' }}>#{tag}</span>)}
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '20px', padding: '28px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Need More Guidance?</h3>
        <p style={{ opacity: 0.9, marginBottom: '20px' }}>Get personalized advice from our experts</p>
        <button onClick={() => openCounsellingPopup()} style={{ background: '#f97316', color: 'white', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: 'none', cursor: 'pointer' }}>Get Counselling</button>
      </div>
    </div>
  );
};

export default BlogDetail;
