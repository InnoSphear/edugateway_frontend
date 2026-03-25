import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminCollegeForm = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split('/').pop();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    name: '', website: '', contact: '', logo: '', category: '', description: '', 
    averagePlacement: '', highestPackage: '', brochureUrl: '', city: '', state: '', rating: '', established: '', ownership: 'Government', tags: '', highlights: '', image: '', facilities: ''
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) { navigate('/admin/login'); return; }
    if (isEdit && id !== 'new') fetchCollege();
  }, [navigate, id]);

  const fetchCollege = async () => {
    try {
      const res = await api.get(`/colleges/id/${id}`);
      const c = res.data;
      setFormData({
        name: c.name || '', website: c.website || '', contact: c.contact || '', 
        logo: c.logo || '', category: c.category || '', description: c.description || '', 
        averagePlacement: c.averagePlacement || '', 
        highestPackage: c.highestPackage || '', brochureUrl: c.brochureUrl || '',
        city: c.location?.city || '', state: c.location?.state || '', rating: c.rating || '',
        established: c.established || '', ownership: c.ownership || 'Government',
        tags: c.tags?.join(', ') || '', highlights: c.highlights?.join(', ') || '',
        image: c.image?.join(', ') || '', facilities: c.facilities?.join(', ') || ''
      });
      setCourses(c.course || []);
    } catch (err) { console.error('Failed to fetch college:', err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        rating: formData.rating ? Number(formData.rating) : undefined,
        established: formData.established ? Number(formData.established) : undefined,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        highlights: formData.highlights.split(',').map(t => t.trim()).filter(Boolean),
        location: { city: formData.city.trim(), state: formData.state.trim() },
        image: formData.image.split(',').map(i => i.trim()).filter(Boolean),
        facilities: formData.facilities.split(',').map(f => f.trim()).filter(Boolean),
        course: courses
      };
      if (isEdit) await api.put(`/admin/colleges/${id}`, data);
      else await api.post('/admin/colleges', data);
      navigate('/admin/colleges');
    } catch (err) { alert('Failed to save college'); }
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addCourse = () => setCourses([...courses, { courseName: '', fee: '', placement: '' }]);
  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };
  const removeCourse = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>{isEdit ? 'Edit College' : 'Add New College'}</h1>
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Website *</label><input type="url" name="website" value={formData.website} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Contact *</label><input type="text" name="contact" value={formData.contact} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Logo URL *</label><input type="url" name="logo" value={formData.logo} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Category *</label><input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Avg Placement *</label><input type="text" name="averagePlacement" value={formData.averagePlacement} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Highest Package</label><input type="text" name="highestPackage" value={formData.highestPackage} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Brochure URL</label><input type="url" name="brochureUrl" value={formData.brochureUrl} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>City</label><input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>State</label><input type="text" name="state" value={formData.state} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Rating</label><input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Established</label><input type="number" name="established" value={formData.established} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Ownership</label><select name="ownership" value={formData.ownership} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}><option>Government</option><option>Private</option><option>Deemed</option><option>Autonomous</option></select></div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
             <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Facilities (comma separated)</label>
             <input type="text" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="e.g. WiFi, Library, Hostel" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
             <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Tags (comma separated)</label>
             <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="engineering, featured, private-medical" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
             <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Highlights (comma separated)</label>
             <input type="text" name="highlights" value={formData.highlights} onChange={handleChange} placeholder="Top placements, modern campus, strong faculty" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
             <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Images URLs (comma separated)</label>
             <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://image1.jpg, https://image2.jpg" style={{ width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
               <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Courses</h3>
               <button type="button" onClick={addCourse} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>+ Add Course</button>
            </div>
            
            {courses.map((course, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px', background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                 <div style={{ flex: 1 }}><input type="text" placeholder="Course Name *" value={course.courseName} onChange={e => updateCourse(idx, 'courseName', e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', outline: 'none' }} /></div>
                 <div style={{ flex: 1 }}><input type="text" placeholder="Fee *" value={course.fee} onChange={e => updateCourse(idx, 'fee', e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', outline: 'none' }} /></div>
                 <div style={{ flex: 1 }}><input type="text" placeholder="Placement *" value={course.placement} onChange={e => updateCourse(idx, 'placement', e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', outline: 'none' }} /></div>
                 <button type="button" onClick={() => removeCourse(idx)} style={{ padding: '10px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>X</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => navigate('/admin/colleges')} style={{ padding: '12px 24px', borderRadius: '10px', border: '2px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>{loading ? 'Saving...' : 'Save College'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCollegeForm;
