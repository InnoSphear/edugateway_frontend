import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../utils/api';

const Blogs = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        const res = await blogAPI.getAll(params);
        setBlogs(res.data.blogs);
        if (!categories.length) {
          const catRes = await blogAPI.getCategories();
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, [searchParams]);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Education Blog</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Expert insights, career guidance, and college tips</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        <Link to="/blogs" style={{ padding: '10px 20px', borderRadius: '24px', background: !searchParams.get('category') ? '#2563eb' : '#f1f5f9', color: !searchParams.get('category') ? 'white' : '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>All</Link>
        {categories.map(cat => (
          <Link key={cat} to={`/blogs?category=${cat}`} style={{ padding: '10px 20px', borderRadius: '24px', background: searchParams.get('category') === cat ? '#2563eb' : '#f1f5f9', color: searchParams.get('category') === cat ? 'white' : '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{cat}</Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {loading ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ height: '320px', background: '#e2e8f0', borderRadius: '16px' }} />) : blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      {blogs.length === 0 && !loading && <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}><h3 style={{ color: '#64748b' }}>No blogs found</h3></div>}
    </div>
  );
};

export default Blogs;
