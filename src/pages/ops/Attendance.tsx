import React, { useState } from 'react';
import { Search, Download, Calendar, Smartphone, UserCheck, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { exportToCSV } from '../../utils/exportUtils';

export const Attendance: React.FC = () => {
  const { attendance, cleaners } = useData();
  const [search, setSearch] = useState('');

  const filtered = attendance.filter(a => a.cleanerName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Mobile Attendance Monitor</h1>
          <p className="text-sm text-gray-500">Live view of staff check-ins from the mobile app</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Calendar size={18} />}>Today</Button>
          <Button icon={<Download size={18} />} onClick={() => exportToCSV(attendance, 'attendance_today')}>Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-emerald-600 text-white border-none">
          <p className="text-xs font-bold opacity-80 uppercase">Present Today</p>
          <h3 className="text-3xl font-bold mt-1">{attendance.length} / {cleaners.length}</h3>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-bold text-gray-400 uppercase">On Field</p>
          <h3 className="text-3xl font-bold mt-1 text-dark">{attendance.filter(a => !a.checkOut).length}</h3>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-bold text-gray-400 uppercase">Avg. Start Time</p>
          <h3 className="text-3xl font-bold mt-1 text-dark">08:12 AM</h3>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Staff Name</th>
                <th className="px-6 py-4">Check-In (App)</th>
                <th className="px-6 py-4">Check-Out (App)</th>
                <th className="px-6 py-4">Total Hours</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Smartphone size={14} className="text-gray-400" />
                      <span className="font-semibold">{record.cleanerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.checkOut || '--'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary-600">{record.totalHours || 'Active'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${record.checkOut ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                      {record.checkOut ? 'Shift Ended' : 'On Duty'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
