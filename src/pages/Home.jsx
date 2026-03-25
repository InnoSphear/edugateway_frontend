import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import CollegeCard from '../components/CollegeCard';
import ExamCard from '../components/ExamCard';
import NewsCard from '../components/NewsCard';
import { blogAPI, collegeAPI, examAPI, newsAPI } from '../utils/api';
import { normalizeCollege } from '../utils/content';
import { openCounsellingPopup } from '../utils/popup';

const tabs = ['All', 'Engineering', 'Management', 'Medical', 'Private Medical', 'MBA'];

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [colleges, setColleges] = useState([]);
  const [exams, setExams] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegeRes, examRes, blogRes, newsRes] = await Promise.all([
          collegeAPI.getAll({ limit: 40, page: 1 }),
          examAPI.getFeatured(),
          blogAPI.getFeatured(),
          newsAPI.getFeatured(),
        ]);

        setColleges((collegeRes.data?.colleges || []).map(normalizeCollege));
        setExams(examRes.data || []);
        setBlogs(blogRes.data || []);
        setNews(newsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
        setColleges([]);
        setExams([]);
        setBlogs([]);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mergedColleges = useMemo(() => colleges, [colleges]);

  const featuredPrograms = useMemo(() => {
    if (activeTab === 'All') return mergedColleges.slice(0, 8);
    const keyMap = { Engineering: 'engineering', Management: 'management', Medical: 'medical', 'Private Medical': 'private-medical', MBA: 'mba' };
    return mergedColleges.filter((college) => (
      college.category?.toLowerCase().includes(keyMap[activeTab])
      || (college.tags || []).some((tag) => tag.includes(keyMap[activeTab]))
    )).slice(0, 8);
  }, [activeTab, mergedColleges]);

  const categorySections = useMemo(() => ([
    { title: 'Top Engineering Colleges', key: 'engineering' },
    { title: 'Top Management Colleges', key: 'management' },
    { title: 'Top Private Medical Colleges', key: 'private-medical' },
    { title: 'Top MBA Colleges', key: 'mba' },
  ].map((section) => ({
    ...section,
    items: mergedColleges.filter((college) => (
      college.category?.toLowerCase().includes(section.key)
      || (college.tags || []).some((tag) => tag.includes(section.key))
    )).slice(0, 4),
  }))), [mergedColleges]);

  const handleSearch = () => {
    const value = query.trim();
    navigate(value ? `/colleges?search=${encodeURIComponent(value)}` : '/colleges');
  };

  return (
    <div>
      <section style={{ padding: '40px 0 24px' }}>
        <div className="container">
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '36px',
            padding: 'clamp(28px, 6vw, 64px)',
            background: 'radial-gradient(circle at top left, rgba(251,146,60,0.28), transparent 26%), linear-gradient(135deg, #fff7ed 0%, #ffffff 45%, #fff1f2 100%)',
            border: '1px solid rgba(148,163,184,0.14)',
            boxShadow: '0 30px 90px rgba(15,23,42,0.08)',
          }}>
            <div style={{ maxWidth: '760px', position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: '999px', background: '#ffffff', color: '#c2410c', fontWeight: 700, fontSize: '0.84rem', boxShadow: '0 12px 28px rgba(15,23,42,0.06)' }}>
                Get your college of choice and enhance your life
              </span>
              <h1 style={{ marginTop: '18px', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.04, fontWeight: 900, letterSpacing: '-0.05em', color: '#0f172a' }}>
                Explore top colleges, exams, news and admissions in one place.
              </h1>
              <p style={{ marginTop: '18px', fontSize: '1.05rem', lineHeight: 1.8, color: '#475569', maxWidth: '640px' }}>
                Discover engineering, medical, MBA and management colleges with integrated course fees, multi-image galleries, fallback content and responsive pagination.
              </p>

              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', maxWidth: '580px' }}>
                {[
                  { label: 'Institutions', value: '6000+' },
                  { label: 'Exams', value: '200+' },
                  { label: 'Courses', value: '200+' },
                  { label: 'Counselling', value: '24/7' },
                ].map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.92)', padding: '16px', borderRadius: '22px', border: '1px solid rgba(148,163,184,0.12)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>{item.value}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', background: 'white', borderRadius: '24px', padding: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px', boxShadow: '0 22px 50px rgba(15,23,42,0.08)' }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search colleges, exams, MBA, MBBS, fees..."
                  style={{ flex: 1, minWidth: '220px', border: 'none', outline: 'none', fontSize: '1rem', padding: '14px 12px', background: 'transparent' }}
                />
                <button onClick={handleSearch} style={{ minWidth: '140px', border: 'none', borderRadius: '18px', background: '#f97316', color: 'white', fontWeight: 800, cursor: 'pointer', padding: '14px 18px' }}>
                  Search
                </button>
              </div>

              <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['JEE Main', 'NEET', 'CAT', 'Private Medical', 'Top Engineering'].map((item) => (
                  <Link key={item} to={`/colleges?search=${encodeURIComponent(item)}`} style={{ padding: '8px 12px', borderRadius: '999px', background: '#ffffff', color: '#334155', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(148,163,184,0.14)' }}>
                    {item}
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button onClick={() => openCounsellingPopup()} style={{ padding: '12px 18px', borderRadius: '999px', border: 'none', background: '#0f172a', color: 'white', fontWeight: 800, cursor: 'pointer' }}>
                  Get Counselling
                </button>
                <Link to="/colleges" style={{ padding: '12px 18px', borderRadius: '999px', background: 'white', color: '#0f172a', fontWeight: 800, border: '1px solid rgba(148,163,184,0.16)' }}>
                  Explore Colleges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '18px 0 28px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { title: 'All Exams', text: 'Get dates, eligibility, prep tips and updates.', link: '/exams' },
              { title: 'All Colleges', text: 'Browse colleges by ranking, fees and stream.', link: '/colleges' },
              { title: 'Latest News', text: 'Track admissions, forms, counselling and results.', link: '/news' },
              { title: 'Career Blogs', text: 'Read practical guides for branches and admissions.', link: '/blogs' },
            ].map((card) => (
              <Link key={card.title} to={card.link} style={{ background: 'white', borderRadius: '24px', padding: '22px', border: '1px solid rgba(148,163,184,0.12)', boxShadow: '0 18px 50px rgba(15,23,42,0.05)' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{card.title}</div>
                <div style={{ marginTop: '8px', color: '#64748b', lineHeight: 1.7 }}>{card.text}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 0 18px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '16px', flexWrap: 'wrap', marginBottom: '22px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.5rem)', fontWeight: 900, color: '#0f172a' }}>Top Colleges in India 2026</h2>
              <p style={{ color: '#64748b', marginTop: '6px' }}>Programs, fees and rankings now sit directly inside the college card and detail model, using the backend college list.</p>
            </div>
            <Link to="/colleges" style={{ padding: '12px 16px', borderRadius: '999px', background: '#0f172a', color: 'white', fontWeight: 700 }}>View all colleges</Link>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '11px 16px',
                  borderRadius: '999px',
                  border: activeTab === tab ? 'none' : '1px solid rgba(148,163,184,0.18)',
                  background: activeTab === tab ? '#f97316' : 'white',
                  color: activeTab === tab ? 'white' : '#334155',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid-4">
            {(loading ? [] : featuredPrograms).map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6px 0 24px' }}>
        <div className="container" style={{ display: 'grid', gap: '28px' }}>
          {categorySections.map((section) => (
            section.items.length > 0 ? (
              <div key={section.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#0f172a' }}>{section.title}</h2>
                    <p style={{ color: '#64748b', marginTop: '6px' }}>Backend college data shown directly on the homepage.</p>
                  </div>
                  <Link to={`/colleges?search=${encodeURIComponent(section.key.replace('-', ' '))}`} style={{ color: '#c2410c', fontWeight: 700 }}>
                    View all
                  </Link>
                </div>
                <div className="grid-4">
                  {section.items.map((college) => (
                    <CollegeCard key={`${section.key}-${college._id}`} college={college} />
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>
      </section>

      <section style={{ padding: '30px 0' }}>
        <div className="container" style={{ display: 'grid', gap: '28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>Popular Exams</h2>
                <p style={{ color: '#64748b', marginTop: '6px' }}>Updated cards with clearer dates and responsive spacing.</p>
              </div>
              <Link to="/exams" style={{ color: '#c2410c', fontWeight: 700 }}>View all exams</Link>
            </div>
            <div className="grid-4">
              {exams.slice(0, 4).map((exam) => <ExamCard key={exam._id} exam={exam} />)}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>Latest News</h2>
                <p style={{ color: '#64748b', marginTop: '6px' }}>Relevant admission and counselling updates to keep the homepage active.</p>
              </div>
              <Link to="/news" style={{ color: '#c2410c', fontWeight: 700 }}>View all news</Link>
            </div>
            <div className="grid-4">
              {news.slice(0, 4).map((item) => <NewsCard key={item._id} news={item} />)}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>Featured Blogs</h2>
                <p style={{ color: '#64748b', marginTop: '6px' }}>Career, exam and admission guidance with seeded content until backend grows.</p>
              </div>
              <Link to="/blogs" style={{ color: '#c2410c', fontWeight: 700 }}>View all blogs</Link>
            </div>
            <div className="grid-4">
              {blogs.slice(0, 4).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
