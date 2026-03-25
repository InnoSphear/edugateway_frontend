import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollegeCard from '../components/CollegeCard';
import { collegeAPI } from '../utils/api';
import { normalizeCollege, paginateItems } from '../utils/content';

const expandTerms = (value) => {
  const term = value?.toLowerCase().trim();
  if (!term) return [];
  const aliases = {
    management: ['management', 'mba', 'pgdm', 'business'],
    mba: ['mba', 'management', 'pgdm', 'business'],
    engineering: ['engineering', 'b.tech', 'technology'],
    medical: ['medical', 'mbbs', 'doctor', 'health'],
    'private medical': ['private medical', 'medical', 'mbbs'],
  };
  return aliases[term] || [term];
};

const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const params = { limit: 100, page: 1, ...Object.fromEntries(searchParams.entries()) };
        const res = await collegeAPI.getAll(params);
        setColleges((res.data.colleges || []).map(normalizeCollege));
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [searchParams]);

  const filteredColleges = useMemo(() => {
    if (!search) return colleges;
    const normalizedTerms = expandTerms(search);
    return colleges.filter((college) => (
      normalizedTerms.some((term) =>
        college.name.toLowerCase().includes(term)
        || college.category.toLowerCase().includes(term)
        || (college.tags || []).some((tag) => tag.toLowerCase().includes(term))
        || (college.course || []).some((course) => course.courseName.toLowerCase().includes(term))
      )
    ));
  }, [colleges, search]);

  const { items, pagination } = paginateItems(filteredColleges, currentPage, 9);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container" style={{ paddingTop: '34px', paddingBottom: '20px' }}>
      <section style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 45%, #eff6ff 100%)', borderRadius: '32px', padding: '28px', border: '1px solid rgba(148,163,184,0.12)', boxShadow: '0 24px 60px rgba(15,23,42,0.06)' }}>
        <span style={{ display: 'inline-flex', padding: '8px 12px', background: 'white', borderRadius: '999px', color: '#c2410c', fontWeight: 700, fontSize: '0.84rem' }}>Responsive college discovery</span>
        <h1 style={{ marginTop: '14px', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.06, color: '#0f172a' }}>Browse all colleges with integrated course and fee data.</h1>
        <p style={{ marginTop: '10px', maxWidth: '760px', color: '#64748b', lineHeight: 1.8 }}>
          This route is the complete backend-driven college listing. Each card and detail view carries its own courses, fees, placements and gallery content.
        </p>
      </section>

      <section style={{ marginTop: '26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{pagination.total} colleges</h2>
          <p style={{ color: '#64748b', marginTop: '4px' }}>{search ? `Showing results for "${search}"` : 'Engineering, medical, MBA and private medical colleges'}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['engineering', 'medical', 'mba', 'management', 'private medical'].map((pill) => (
            <button
              key={pill}
              onClick={() => setSearchParams({ search: pill, page: '1' })}
              style={{ padding: '10px 14px', borderRadius: '999px', border: '1px solid rgba(148,163,184,0.16)', background: search.toLowerCase() === pill ? '#f97316' : 'white', color: search.toLowerCase() === pill ? 'white' : '#334155', fontWeight: 700, cursor: 'pointer' }}
            >
              {pill}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="grid-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{ height: '360px', borderRadius: '24px', background: '#e2e8f0' }} />
            ))}
          </div>
        ) : items.length ? (
          <>
            <div className="grid-4">
              {items.map((college) => <CollegeCard key={college._id} college={college} />)}
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <button disabled={pagination.page === 1} onClick={() => goToPage(pagination.page - 1)} style={{ padding: '12px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'white', cursor: pagination.page === 1 ? 'not-allowed' : 'pointer', opacity: pagination.page === 1 ? 0.5 : 1 }}>
                Previous
              </button>
              {Array.from({ length: pagination.pages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    style={{ width: '46px', height: '46px', borderRadius: '14px', border: pagination.page === page ? 'none' : '1px solid #e2e8f0', background: pagination.page === page ? '#0f172a' : 'white', color: pagination.page === page ? 'white' : '#334155', fontWeight: 800, cursor: 'pointer' }}
                  >
                    {page}
                  </button>
                );
              })}
              <button disabled={pagination.page === pagination.pages} onClick={() => goToPage(pagination.page + 1)} style={{ padding: '12px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'white', cursor: pagination.page === pagination.pages ? 'not-allowed' : 'pointer', opacity: pagination.page === pagination.pages ? 0.5 : 1 }}>
                Next
              </button>
            </div>
          </>
        ) : (
          <div style={{ background: 'white', borderRadius: '28px', padding: '48px 24px', textAlign: 'center', border: '1px solid rgba(148,163,184,0.12)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>No colleges found</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Try another stream, exam or college name.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Colleges;
