import React, { useState } from 'react';
import { Search, Download, FileText, Calendar, ChevronRight, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { exportToCSV, simulatePDFExport } from '../../utils/exportUtils';
import { DetailModal } from '../../components/modals/DetailModal';

export const AttendanceReports: React.FC = () => {
  const { attendance } = useData();
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filtered = attendance.filter(a => a.cleanerName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">Attendance Reports</h1>
          <p className="text-sm text-gray-500">Historical logs of staff attendance and hours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<FileText size={18} />} onClick={() => simulatePDFExport('Attendance Report')}>Export PDF</Button>
          <Button icon={<Download size={18} />} onClick={() => exportToCSV(attendance, 'attendance_report')}>Export CSV</Button>
        </div>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search staff..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Button variant="outline" size="sm" icon={<Calendar size={16} />}>Date Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Staff Name</th>
                <th className="px-6 py-4">Check-In</th>
                <th className="px-6 py-4">Check-Out</th>
                <th className="px-6 py-4">Total Hours</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 text-sm font-medium">{record.date}</td>
                  <td className="px-6 py-4 font-semibold">{record.cleanerName}</td>
                  <td className="px-6 py-4 text-sm">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm">{record.checkOut || '--'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary-600">{record.totalHours || '--'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setSelectedRecord(record); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-primary-600"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="attendance" data={selectedRecord} />
    </div>
  );
};
