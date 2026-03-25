import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogAPI, collegeAPI, newsAPI } from '../utils/api';
import { normalizeCollege, resolveMediaUrl } from '../utils/content';
import { openCounsellingPopup } from '../utils/popup';

const tabs = ['Overview', 'Courses & Fees', 'Facilities', 'Highlights'];

const CollegeDetail = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeImage, setActiveImage] = useState(0);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const [collegeRes, blogRes, newsRes] = await Promise.all([
          collegeAPI.getBySlug(slug),
          blogAPI.getFeatured(),
          newsAPI.getFeatured(),
        ]);
        setCollege(normalizeCollege(collegeRes.data));
        setRelatedBlogs(blogRes.data || []);
        setRelatedNews(newsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch college:', error);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  const gallery = useMemo(() => college?.image?.length ? college.image : ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'], [college]);

  if (loading) {
    return <div className="container" style={{ paddingTop: '32px' }}><div style={{ height: '520px', background: '#e2e8f0', borderRadius: '28px' }} /></div>;
  }

  if (!college) {
    return <div className="container" style={{ paddingTop: '32px' }}><div style={{ background: 'white', borderRadius: '28px', padding: '48px', textAlign: 'center' }}>College not found</div></div>;
  }

  return (
    <div className="container" style={{ paddingTop: '28px' }}>
      <section style={{ background: 'white', borderRadius: '34px', padding: '24px', border: '1px solid rgba(148,163,184,0.12)', boxShadow: '0 24px 70px rgba(15,23,42,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 0.9fr)', gap: '22px' }} className="detail-grid">
          <div>
            <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', minHeight: '360px', background: '#f8fafc' }}>
              <img src={resolveMediaUrl(gallery[activeImage])} alt={college.name} style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.06), rgba(15,23,42,0.74))' }} />
              <div style={{ position: 'absolute', left: '20px', right: '20px', bottom: '20px', color: 'white' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', fontWeight: 700, fontSize: '0.82rem' }}>{college.category}</span>
                  <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', fontWeight: 700, fontSize: '0.82rem' }}>{college.rating}/5 rating</span>
                  {college.ranking?.rank ? <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', fontWeight: 700, fontSize: '0.82rem' }}>{college.ranking.authority} #{college.ranking.rank}</span> : null}
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.05, fontWeight: 900 }}>{college.name}</h1>
                <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.88)', maxWidth: '760px', lineHeight: 1.7 }}>
                  {college.location?.city}{college.location?.state ? `, ${college.location.state}` : ''} | Est. {college.established || 'N/A'} | {college.ownership}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginTop: '12px' }}>
              {gallery.slice(0, 4).map((image, index) => (
                <button key={image} onClick={() => setActiveImage(index)} style={{ border: activeImage === index ? '2px solid #f97316' : '1px solid #e2e8f0', borderRadius: '18px', overflow: 'hidden', cursor: 'pointer', padding: 0, background: 'white' }}>
                  <img src={resolveMediaUrl(image)} alt={`${college.name} ${index + 1}`} style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ background: '#fff7ed', borderRadius: '24px', padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fees</div>
                  <div style={{ marginTop: '5px', fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>{college.course?.[0]?.fee || 'On request'}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg Package</div>
                  <div style={{ marginTop: '5px', fontSize: '1.3rem', fontWeight: 900, color: '#0f766e' }}>{college.averagePlacement}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Highest Package</div>
                  <div style={{ marginTop: '5px', fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>{college.highestPackage || 'On request'}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</div>
                  <div style={{ marginTop: '5px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{college.contact}</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '20px', border: '1px solid rgba(148,163,184,0.12)' }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 14px', borderRadius: '999px', border: activeTab === tab ? 'none' : '1px solid #e2e8f0', background: activeTab === tab ? '#0f172a' : 'white', color: activeTab === tab ? 'white' : '#334155', fontWeight: 700, cursor: 'pointer' }}>
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                {activeTab === 'Overview' && (
                  <div>
                    <p style={{ color: '#475569', lineHeight: 1.85 }}>{college.description}</p>
                    <div style={{ marginTop: '16px', display: 'grid', gap: '10px' }}>
                      {college.highlights.map((item) => (
                        <div key={item} style={{ padding: '12px 14px', borderRadius: '16px', background: '#f8fafc', color: '#334155', fontWeight: 600 }}>{item}</div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'Courses & Fees' && (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {college.course.map((course) => (
                      <div key={course.courseName} style={{ padding: '16px', borderRadius: '18px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{course.courseName}</div>
                            <div style={{ marginTop: '6px', color: '#64748b' }}>{course.duration || 'Varies'} | {course.eligibility || 'Eligibility on request'}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{course.fee}</div>
                            <div style={{ marginTop: '6px', color: '#0f766e', fontWeight: 700 }}>{course.placement}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Facilities' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {(college.facilities || []).map((item) => (
                      <div key={item} style={{ padding: '14px', borderRadius: '16px', background: '#f8fafc', color: '#334155', fontWeight: 700 }}>{item}</div>
                    ))}
                  </div>
                )}

                {activeTab === 'Highlights' && (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ padding: '16px', borderRadius: '18px', background: '#f8fafc' }}>
                      <strong style={{ color: '#0f172a' }}>Official website</strong>
                      <div style={{ marginTop: '8px' }}><a href={college.website} target="_blank" rel="noreferrer" style={{ color: '#c2410c', fontWeight: 700 }}>{college.website}</a></div>
                    </div>
                    <div style={{ padding: '16px', borderRadius: '18px', background: '#f8fafc' }}>
                      <strong style={{ color: '#0f172a' }}>Brochure</strong>
                      <div style={{ marginTop: '8px' }}>{college.brochureUrl ? <a href={college.brochureUrl} target="_blank" rel="noreferrer" style={{ color: '#c2410c', fontWeight: 700 }}>Open brochure link</a> : 'Available on request'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)', gap: '22px' }} className="detail-grid">
        <div style={{ background: 'white', borderRadius: '28px', padding: '22px', border: '1px solid rgba(148,163,184,0.12)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>Related news and guidance</h2>
          <div style={{ marginTop: '16px', display: 'grid', gap: '16px' }}>
            {relatedNews.slice(0, 2).map((item) => (
              <div key={item.slug} style={{ paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <Link to={`/news/${item.slug}`} style={{ fontWeight: 800, color: '#0f172a' }}>{item.title}</Link>
                <p style={{ marginTop: '8px', color: '#64748b', lineHeight: 1.7 }}>{item.excerpt}</p>
              </div>
            ))}
            {relatedBlogs.slice(0, 2).map((item) => (
              <div key={item.slug}>
                <Link to={`/blogs/${item.slug}`} style={{ fontWeight: 800, color: '#0f172a' }}>{item.title}</Link>
                <p style={{ marginTop: '8px', color: '#64748b', lineHeight: 1.7 }}>{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '28px', padding: '24px', color: 'white' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.2 }}>Need personalised counselling for {college.shortName || college.name}?</div>
          <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>
            Get a callback for admissions, fees, placements and course matching.
          </p>
          <button onClick={() => openCounsellingPopup({ course: college.course?.[0]?.courseName || '', city: college.location?.city || '' })} style={{ marginTop: '18px', display: 'inline-flex', padding: '12px 16px', borderRadius: '999px', background: '#f97316', color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
            Get Counselling
          </button>
        </div>
      </section>
    </div>
  );
};

export default CollegeDetail;
