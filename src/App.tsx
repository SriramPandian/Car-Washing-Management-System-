import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Locations } from './pages/masters/Locations';
import { Flats } from './pages/masters/Flats';
import { Customers } from './pages/masters/Customers';
import { Cleaners } from './pages/masters/Cleaners';
import { Assignments } from './pages/masters/Assignments';
import { AvailableFlats } from './pages/ops/AvailableFlats';
import { DailyWashes } from './pages/ops/DailyWashes';
import { Attendance } from './pages/ops/Attendance';
import { WashReports } from './pages/reports/WashReports';
import { AttendanceReports } from './pages/reports/AttendanceReports';
import { CustomerReviews } from './pages/reviews/CustomerReviews';
import { Settings } from './pages/settings/Settings';
import { DataProvider } from './context/DataContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar collapsed={collapsed} />
      <div className={`transition-all duration-300 ${collapsed ? 'pl-20' : 'pl-64'}`}>
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated] = useState(true);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" />
          } />

          {/* Masters */}
          <Route path="/masters/locations" element={<MainLayout><Locations /></MainLayout>} />
          <Route path="/masters/flats" element={<MainLayout><Flats /></MainLayout>} />
          <Route path="/masters/customers" element={<MainLayout><Customers /></MainLayout>} />
          <Route path="/masters/cleaners" element={<MainLayout><Cleaners /></MainLayout>} />
          <Route path="/masters/assignments" element={<MainLayout><Assignments /></MainLayout>} />
          
          {/* Operations */}
          <Route path="/ops/available-flats" element={<MainLayout><AvailableFlats /></MainLayout>} />
          <Route path="/ops/daily-washes" element={<MainLayout><DailyWashes /></MainLayout>} />
          <Route path="/ops/attendance" element={<MainLayout><Attendance /></MainLayout>} />

          {/* Analytics & Reports */}
          <Route path="/reports/washes" element={<MainLayout><WashReports /></MainLayout>} />
          <Route path="/reports/attendance" element={<MainLayout><AttendanceReports /></MainLayout>} />
          <Route path="/reviews" element={<MainLayout><CustomerReviews /></MainLayout>} />
          
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />

          <Route path="*" element={
            <MainLayout>
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-6">
                  <Wrench size={40} className="animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold text-dark mb-2">Module Under Construction</h2>
                <p className="text-gray-500 max-w-md">
                  We're currently building this section to provide you with the best management experience. Check back soon!
                </p>
              </div>
            </MainLayout>
          } />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
