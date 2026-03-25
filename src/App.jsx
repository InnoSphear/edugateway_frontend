import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadPopup from './components/LeadPopup';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeDetail from './pages/CollegeDetail';
import StreamPage from './pages/StreamPage';
import Exams from './pages/Exams';
import ExamDetail from './pages/ExamDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Updates from './pages/Updates';
import { Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminColleges from './pages/admin/AdminColleges';
import AdminCollegeForm from './pages/admin/AdminCollegeForm';
import AdminStreams from './pages/admin/AdminStreams';
import AdminCourses from './pages/admin/AdminCourses';
import AdminExams from './pages/admin/AdminExams';
import AdminNews from './pages/admin/AdminNews';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminLeads from './pages/admin/AdminLeads';

import AdminLayout from './components/admin/AdminLayout';

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Manrope', system-ui, -apple-system, sans-serif" }}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="colleges" element={<AdminColleges />} />
              <Route path="colleges/new" element={<AdminCollegeForm />} />
              <Route path="colleges/:id" element={<AdminCollegeForm />} />
              <Route path="streams" element={<AdminStreams />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="exams" element={<AdminExams />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="leads" element={<AdminLeads />} />
            </Route>
            
            <Route path="*" element={
              <>
                <Navbar />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/colleges" element={<Colleges />} />
                    <Route path="/colleges/:slug" element={<CollegeDetail />} />
                    <Route path="/streams/:slug" element={<StreamPage />} />
                    <Route path="/exams" element={<Exams />} />
                    <Route path="/exams/:slug" element={<ExamDetail />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogDetail />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:slug" element={<NewsDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about.php" element={<Navigate to="/about" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contact.php" element={<Navigate to="/contact" replace />} />
                    <Route path="/updates" element={<Updates />} />
                    <Route path="/updates.php" element={<Navigate to="/updates" replace />} />
                    <Route path="/colleges.php" element={<Navigate to="/colleges" replace />} />
                    <Route path="/btech" element={<Navigate to="/colleges?search=B.Tech" replace />} />
                    <Route path="/btech.php" element={<Navigate to="/colleges?search=B.Tech" replace />} />
                    <Route path="/mtech.php" element={<Navigate to="/colleges?search=M.Tech" replace />} />
                    <Route path="/bba.php" element={<Navigate to="/colleges?search=BBA" replace />} />
                    <Route path="/mba.php" element={<Navigate to="/colleges?search=MBA" replace />} />
                    <Route path="/mbbs.php" element={<Navigate to="/colleges?search=MBBS" replace />} />
                    <Route path="/ms.php" element={<Navigate to="/colleges?search=MS" replace />} />
                    <Route path="/md.php" element={<Navigate to="/colleges?search=MD" replace />} />
                    <Route path="/bsc.php" element={<Navigate to="/colleges?search=B.Sc" replace />} />
                    <Route path="/msc.php" element={<Navigate to="/colleges?search=M.Sc" replace />} />
                    <Route path="/bed.php" element={<Navigate to="/colleges?search=B.Ed" replace />} />
                    <Route path="/med" element={<Navigate to="/colleges?search=M.Ed" replace />} />
                    <Route path="/llb.php" element={<Navigate to="/colleges?search=LLB" replace />} />
                  </Routes>
                </main>
                <Footer />
                <LeadPopup />
              </>
            } />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
