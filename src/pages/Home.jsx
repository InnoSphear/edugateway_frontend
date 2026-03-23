import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollegeCard from '../components/CollegeCard';
import ExamCard from '../components/ExamCard';
import BlogCard from '../components/BlogCard';
import { collegeAPI, examAPI, blogAPI, streamAPI } from '../utils/api';

const dummyColleges = [
  { _id: '1', name: 'Indian Institute of Technology Bombay', category: 'Engineering', logo: '', image: ['https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000'], course: [{courseName: 'B.Tech Computer Science', fee: '₹2.5L/yr'}], averagePlacement: '₹20 LPA' },
  { _id: '2', name: 'All India Institute of Medical Sciences', category: 'Medical', logo: '', image: ['https://images.unsplash.com/photo-1519452285856-425f383e6015?q=80&w=1000'], course: [{courseName: 'MBBS', fee: '₹1.5L/yr'}], averagePlacement: '₹14 LPA' },
  { _id: '3', name: 'Indian Institute of Management Ahmedabad', category: 'Management', logo: '', image: ['https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1000'], course: [{courseName: 'MBA', fee: '₹11L/yr'}], averagePlacement: '₹28 LPA' },
  { _id: '4', name: 'National Institute of Technology Trichy', category: 'Engineering', logo: '', image: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000'], course: [{courseName: 'B.Tech Electrical', fee: '₹1.8L/yr'}], averagePlacement: '₹12 LPA' }
];

const dummyExams = [
  { _id: '1', name: 'JEE Main 2024', fullName: 'Joint Entrance Examination', conductingBody: 'NTA', examLevel: 'National', status: 'upcoming' },
  { _id: '2', name: 'NEET UG 2024', fullName: 'National Eligibility cum Entrance Test', conductingBody: 'NTA', examLevel: 'National', status: 'upcoming' },
  { _id: '3', name: 'CAT 2024', fullName: 'Common Admission Test', conductingBody: 'IIMs', examLevel: 'National', status: 'upcoming' }
];

const dummyBlogs = [
  { _id: '1', title: 'Top 10 Emerging Career Options in 2024', category: 'Career Focus', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000', views: 1200, createdAt: new Date().toISOString() },
  { _id: '2', title: 'How to Choose the Right Engineering Branch?', category: 'College Guide', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000', views: 850, createdAt: new Date().toISOString() },
  { _id: '3', title: 'Last Minute Preparation Tips for JEE Main', category: 'Exams', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000', views: 2300, createdAt: new Date().toISOString() }
];

const PaginationControls = ({ current, total, onPageChange }) => {
  if (total <= 1) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            width: '10px', height: '10px', borderRadius: '50%', padding: 0,
            border: current === i ? 'none' : '1px solid #cbd5e1',
            background: current === i ? '#2563eb' : 'transparent',
            cursor: 'pointer', transition: 'all 0.3s'
          }}
          aria-label={`Page ${i + 1}`}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const [featuredExams, setFeaturedExams] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isMobile, setIsMobile] = useState(false);
  
  const [collegesPage, setCollegesPage] = useState(0);
  const [examsPage, setExamsPage] = useState(0);
  const [blogsPage, setBlogsPage] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colleges, exams, blogs, streamsData] = await Promise.all([
          collegeAPI.getFeatured(),
          examAPI.getFeatured(),
          blogAPI.getFeatured(),
          streamAPI.getAll()
        ]);
        setFeaturedColleges(colleges.data?.length ? colleges.data : dummyColleges);
        setFeaturedExams(exams.data?.length ? exams.data : dummyExams);
        setFeaturedBlogs(blogs.data?.length ? blogs.data : dummyBlogs);
        setStreams(streamsData.data);
      } catch (err) {
        console.error('Failed to fetch data, using dummy data', err);
        setFeaturedColleges(dummyColleges);
        setFeaturedExams(dummyExams);
        setFeaturedBlogs(dummyBlogs);
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

  const getPaginatedList = (list, page) => {
    if (!isMobile) return list;
    const itemsPerPage = 2; // Show 2 items per page on mobile
    const start = page * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };

  const getPageCount = (list) => {
    if (!isMobile) return 0;
    return Math.ceil(list.length / 2);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ 
        background: 'linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7)), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070")', 
        backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 24px 100px', textAlign: 'center', position: 'relative' 
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'white', marginBottom: '20px', lineHeight: 1.15, letterSpacing: '-1.5px' }}>
            Find Your Dream College in India
          </h1>
          <p style={{ fontSize: '18px', color: '#e2e8f0', marginBottom: '40px', maxWidth: '750px', margin: '0 auto 40px', fontWeight: 500 }}>
            <span style={{ margin: '0 12px' }}>✔ 6000+ Colleges</span>
            <span style={{ margin: '0 12px' }}>✔ 200+ Exams</span>
            <span style={{ margin: '0 12px' }}>✔ Detailed Reviews</span>
            <span style={{ margin: '0 12px' }}>✔ Free Counselling</span>
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
          <div style={{ marginTop: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 600, alignSelf: 'center', marginRight: '8px' }}>Popular:</span>
            {quickSearches.map((q, i) => (
              <Link key={i} to={`/colleges?search=${q.query}`} style={{
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

      {streams.length > 0 && (
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
      )}

      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Top Ranked Colleges</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>Discover the best institutions in India across all streams</p>
          </div>
          <Link to="/colleges" style={{
            background: 'white', color: '#2563eb', padding: '10px 24px',
            borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            border: '1px solid #2563eb', transition: 'all 0.2s'
          }}>View All →</Link>
        </div>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4].map(i => <div key={i} style={{ height: '320px', background: '#e2e8f0', borderRadius: '12px', animation: 'pulse 2s infinite' }} />)}
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {getPaginatedList(featuredColleges, collegesPage).map(college => <CollegeCard key={college._id} college={college} />)}
            </div>
            <PaginationControls current={collegesPage} total={getPageCount(featuredColleges)} onPageChange={setCollegesPage} />
          </>
        )}
      </section>

      <section  style={{ background: '#0f172a', color: 'white', padding: '80px 24px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Why Choose Education Gateway?</h2>
          <p style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '40px', lineHeight: 1.6 }}>We simplify the college admission process by providing accurate, up-to-date information, expert counseling, and a seamless application experience. Your educational journey begins here.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', width: '100%' }}>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Extensive Database</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>Access detailed information on over 10,000 top colleges and universities.</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Expert Counseling</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>Get personalized guidance from industry experts to make informed decisions.</p>
            </div>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Easy Application</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>Apply to multiple colleges with a single application form.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Popular Exams</h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>Stay updated with upcoming entrance exams</p>
          </div>
          <Link to="/exams" style={{
             background: 'white', color: '#2563eb', padding: '10px 24px',
             borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
             border: '1px solid #2563eb'
          }}>View All Exams →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {getPaginatedList(featuredExams, examsPage).map(exam => <ExamCard key={exam._id} exam={exam} />)}
        </div>
        <PaginationControls current={examsPage} total={getPageCount(featuredExams)} onPageChange={setExamsPage} />
      </section>

      <section style={{ background: '#eff6ff', padding: '60px 0' }}>
        <div className="container" style={{ padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>Latest from Blog</h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Expert insights and career guidance</p>
            </div>
            <Link to="/blogs" style={{
               background: 'white', color: '#2563eb', padding: '10px 24px',
               borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
               border: '1px solid #2563eb'
            }}>View All Blogs →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {getPaginatedList(featuredBlogs, blogsPage).map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
          <PaginationControls current={blogsPage} total={getPageCount(featuredBlogs)} onPageChange={setBlogsPage} />
        </div>
      </section>
    </div>
  );
};

export default Home;
