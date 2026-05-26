import React, { useState } from 'react';
import { Search, Filter, Download, FileText, Calendar, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { exportToCSV, simulatePDFExport } from '../../utils/exportUtils';
import { DetailModal } from '../../components/modals/DetailModal';

export const WashReports: React.FC = () => {
  const { washes } = useData();
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedWash, setSelectedWash] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filtered = washes.filter(w => 
    w.cleanerName.toLowerCase().includes(search.toLowerCase()) ||
    w.flatNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Wash Reports</h1>
          <p className="text-sm text-gray-500">Historical performance and duration logs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<FileText size={18} />} onClick={() => simulatePDFExport('Wash Report')}>Export PDF</Button>
          <Button icon={<Download size={18} />} onClick={() => exportToCSV(washes, 'wash_report')}>Export Excel</Button>
        </div>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 bg-gray-50 border rounded-lg text-sm outline-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
            <Button variant="outline" size="sm" icon={<Filter size={16} />}>Filters</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Cleaner</th>
                <th className="px-6 py-4">Flat</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(wash => (
                <tr key={wash.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{wash.date}</td>
                  <td className="px-6 py-4 font-semibold">{wash.cleanerName}</td>
                  <td className="px-6 py-4 text-sm">{wash.flatNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{wash.duration || '--'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${wash.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{wash.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => { setSelectedWash(wash); setIsDetailOpen(true); }}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="wash" data={selectedWash} />
    </div>
  );
};
