import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Clock, Image as ImageIcon, CheckCircle2, PlayCircle, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { DetailModal } from '../../components/modals/DetailModal';

export const DailyWashes: React.FC = () => {
  const { washes, startWash, completeWash } = useData();
  const [search, setSearch] = useState('');
  const [selectedWash, setSelectedWash] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredWashes = washes.filter(w => 
    w.cleanerName.toLowerCase().includes(search.toLowerCase()) ||
    w.flatNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Daily Wash Logs</h1>
          <p className="text-sm text-gray-500">Real-time tracking of washing operations</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button className="px-4 py-2 text-sm font-bold bg-primary-600 text-white rounded-lg">Today</button>
          <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-lg">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-primary-600 text-white border-none">
          <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Total Washes</p>
          <h4 className="text-2xl font-bold mt-1">{washes.length}</h4>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed</p>
          <h4 className="text-2xl font-bold mt-1 text-green-600">{washes.filter(w => w.status === 'completed').length}</h4>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">In Progress</p>
          <h4 className="text-2xl font-bold mt-1 text-blue-600">{washes.filter(w => w.status === 'in-progress').length}</h4>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending</p>
          <h4 className="text-2xl font-bold mt-1 text-amber-600">{washes.filter(w => w.status === 'pending').length}</h4>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by cleaner, flat or customer..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" icon={<Filter size={16} />}>Status</Button>
            <Button variant="outline" size="sm" icon={<Download size={16} />}>Report</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4">Time Window</th>
                <th className="px-6 py-4">Cleaner</th>
                <th className="px-6 py-4">Flat / Customer</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWashes.map((wash) => (
                <tr key={wash.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-dark">{wash.startTime}</span>
                      {wash.endTime && <span className="text-[10px] text-gray-400">to {wash.endTime}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-700">{wash.cleanerName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-dark">{wash.flatNumber}</span>
                      <span className="text-xs text-gray-500">{wash.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      {wash.duration || 'Running...'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      wash.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      wash.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {wash.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedWash(wash); setIsDetailOpen(true); }}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>
                      {wash.status === 'in-progress' && (
                        <Button 
                          size="sm" 
                          variant="primary" 
                          onClick={() => completeWash(wash.id)}
                          icon={<CheckCircle2 size={14} />}
                        >
                          Finish
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        type="wash" 
        data={selectedWash} 
      />
    </div>
  );
};
