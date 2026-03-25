import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../utils/api';
import { paginateItems } from '../utils/content';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await blogAPI.getAll();
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const { items, pagination } = paginateItems(blogs, page, 6);

  return (
    <div className="container" style={{ paddingTop: '34px' }}>
      <section style={{ background: 'white', borderRadius: '30px', padding: '28px', border: '1px solid rgba(148,163,184,0.12)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a' }}>Blogs & Guidance</h1>
        <p style={{ marginTop: '10px', color: '#64748b', lineHeight: 1.8 }}>Seeded blog content stays visible until the backend starts replacing it naturally.</p>
      </section>
      <section style={{ marginTop: '24px' }}>
        <div className="grid-4">
          {(loading ? [] : items).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
        {!loading && pagination.pages > 1 && (
          <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {Array.from({ length: pagination.pages }).map((_, index) => (
              <button key={index + 1} onClick={() => setPage(index + 1)} style={{ width: '44px', height: '44px', borderRadius: '14px', border: page === index + 1 ? 'none' : '1px solid #e2e8f0', background: page === index + 1 ? '#0f172a' : 'white', color: page === index + 1 ? 'white' : '#334155', fontWeight: 800, cursor: 'pointer' }}>{index + 1}</button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blogs;
