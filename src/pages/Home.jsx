import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollegeCard from '../components/CollegeCard';
import ExamCard from '../components/ExamCard';
import BlogCard from '../components/BlogCard';
import { collegeAPI, examAPI, blogAPI, streamAPI } from '../utils/api';

const Home = () => {
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const [featuredExams, setFeaturedExams] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colleges, exams, blogs, streamsData] = await Promise.all([
          collegeAPI.getFeatured(),
          examAPI.getFeatured(),
          blogAPI.getFeatured(),
          streamAPI.getAll()
        ]);
        setFeaturedColleges(colleges.data);
        setFeaturedExams(exams.data);
        setFeaturedBlogs(blogs.data);
        setStreams(streamsData.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const quickSearches = [
    { label: 'Top MBA Colleges', query: 'MBA' },
    { label: 'Best Engineering', query: 'B.Tech' },
    { label: 'Top Medical', query: 'MBBS' },
    { label: 'Government', query: 'Government' },
    { label: 'Affordable', query: 'feesMax=100000' },
    { label: '4+ Rating', query: 'rating=4' }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{ 
        background: 'linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7)), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070")', 
        backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 24px 100px', textAlign: 'center', position: 'relative' 
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'white', marginBottom: '20px', lineHeight: 1.15, letterSpacing: '-1.5px' }}>
            Explore Top Colleges, Exams, Results & More
          </h1>
          <p style={{ fontSize: '18px', color: '#e2e8f0', marginBottom: '40px', maxWidth: '750px', margin: '0 auto 40px', fontWeight: 500 }}>
            <span style={{ margin: '0 12px' }}>✔ 6000+ Institutions</span>
            <span style={{ margin: '0 12px' }}>✔ 200+ Exams</span>
            <span style={{ margin: '0 12px' }}>✔ 200+ Online Courses</span>
            <span style={{ margin: '0 12px' }}>✔ 200+ Courses</span>
          </p>
          <div style={{ background: 'white', borderRadius: '12px', padding: '10px', display: 'flex', gap: '10px', maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderRight: '1px solid #e2e8f0', paddingRight: '10px' }}>
              <span style={{ padding: '0 16px', color: '#94a3b8', fontSize: '20px' }}>🔍</span>
              <input type="text" placeholder="Search for Colleges, Exams, Courses and more..." style={{ width: '100%', minWidth: '200px', padding: '16px 0', border: 'none', fontSize: '16px', outline: 'none', color: '#0f172a' }} />
            </div>
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '0 40px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.target.style.background = '#ea580c'}
              onMouseLeave={e => e.target.style.background = '#f97316'}
            >Search</button>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 600, alignSelf: 'center', marginRight: '8px' }}>Popular:</span>
            {quickSearches.map((q, i) => (
              <Link key={i} to={`/colleges?${q.query.includes('=') ? q.query : 'search=' + q.query}`} style={{
                background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '13px', textDecoration: 'none', backdropFilter: 'blur(10px)', transition: 'all 0.2s', fontWeight: 500
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >{q.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Browse by Stream</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>Explore colleges by your preferred field of study</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {streams.map((stream, i) => (
            <Link key={stream._id} to={`/streams/${stream.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', cursor: 'pointer', height: '100%'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = '#2563eb'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'transparent'; }}
              >
                <div style={{
                  width: '56px', height: '56px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                }}>
                  <span style={{ color: 'white', fontSize: '24px', fontWeight: 800 }}>{stream.name[0]}</span>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{stream.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Featured Colleges</h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Top-ranked institutions across India</p>
            </div>
            <Link to="/colleges?featured=true" style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '12px 24px',
              borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>View All Colleges →</Link>
          </div>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[1, 2, 3].map(i => <div key={i} style={{ height: '360px', background: '#e2e8f0', borderRadius: '16px', animation: 'pulse 2s infinite' }} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {featuredColleges.map(college => <CollegeCard key={college._id} college={college} />)}
            </div>
          )}
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Popular Exams</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>Stay updated with upcoming entrance exams</p>
          </div>
          <Link to="/exams" style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '12px 24px',
            borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}>View All Exams →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {featuredExams.map(exam => <ExamCard key={exam._id} exam={exam} />)}
        </div>
      </section>

      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Latest from Blog</h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Expert insights and career guidance</p>
            </div>
            <Link to="/blogs" style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '12px 24px',
              borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>View All Blogs →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {featuredBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>Need Help Choosing a College?</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>Get free counseling from our experts and find the best college for your career goals</p>
          <Link to="/contact" style={{
            background: 'white', color: '#2563eb', padding: '16px 40px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700, fontSize: '16px', display: 'inline-block',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}>Get Free Counseling</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
