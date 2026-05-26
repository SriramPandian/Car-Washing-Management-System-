import React, { useState } from 'react';
import { Search, Filter, Calendar, UserPlus, Eye, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Flat } from '../../types';
import { generateFlats } from '../../utils/mockData';
import { AssignCleanerModal } from '../../components/ops/AssignCleanerModal';

export const AvailableFlats: React.FC = () => {
  const [flats, setFlats] = useState<Flat[]>(generateFlats(15).map(f => ({
    ...f,
    washStatus: Math.random() > 0.5 ? 'pending' : (Math.random() > 0.5 ? 'assigned' : 'completed'),
    lastWashDate: '2025-06-10',
    preferredSlot: '08:00 AM - 10:00 AM',
    vehicleDetails: 'White BMW X5 (KA 01 MG 1234)'
  })));
  
  const [activeTab, setActiveTab] = useState<'pending' | 'assigned' | 'completed'>('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

  const filteredFlats = flats.filter(f => f.washStatus === activeTab);

  const handleAssignClick = (flat: Flat) => {
    setSelectedFlat(flat);
    setIsModalOpen(true);
  };

  const onAssign = (cleanerId: string) => {
    if (selectedFlat) {
      setFlats(prev => prev.map(f => 
        f.id === selectedFlat.id ? { ...f, washStatus: 'assigned' } : f
      ));
      // In a real app, show a toast here
    }
  };

  const stats = {
    pending: flats.filter(f => f.washStatus === 'pending').length,
    assigned: flats.filter(f => f.washStatus === 'assigned').length,
    completed: flats.filter(f => f.washStatus === 'completed').length,
    unassigned: flats.filter(f => f.washStatus === 'pending').length // Same for this logic
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Available Flats for Cleaning</h1>
          <p className="text-sm text-gray-500">Assign cleaners to pending flats and monitor progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={<Calendar size={18} />}>Today</Button>
          <Button icon={<Filter size={18} />}>Advanced Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pending</p>
          <h4 className="text-2xl font-bold mt-1 text-dark">{stats.pending}</h4>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unassigned</p>
          <h4 className="text-2xl font-bold mt-1 text-dark">{stats.unassigned}</h4>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Today</p>
          <h4 className="text-2xl font-bold mt-1 text-dark">{stats.assigned}</h4>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Today</p>
          <h4 className="text-2xl font-bold mt-1 text-dark">{stats.completed}</h4>
        </Card>
      </div>

      <Card className="p-0">
        <div className="border-b border-gray-100">
          <div className="flex px-6">
            {(['pending', 'assigned', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab} Flats ({flats.filter(f => f.washStatus === tab).length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by flat, location or customer..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="text-sm border-gray-200 rounded-lg py-2 px-3 bg-gray-50">
              <option>All Locations</option>
              <option>Skyline Residency</option>
              <option>Green Valley</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4">Flat Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle Details</th>
                <th className="px-6 py-4">Last Wash</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFlats.map((flat) => (
                <tr key={flat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-dark text-sm">{flat.number}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{flat.locationName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{flat.customerName}</td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600">{flat.vehicleDetails}</p>
                    <p className="text-[10px] text-gray-400 mt-1 italic">{flat.preferredSlot}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.lastWashDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      flat.washStatus === 'completed' ? 'bg-green-100 text-green-700' : 
                      flat.washStatus === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {flat.washStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                        <Eye size={16} />
                      </button>
                      {flat.washStatus === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="primary" 
                          icon={<UserPlus size={14} />}
                          onClick={() => handleAssignClick(flat)}
                        >
                          Assign
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

      <AssignCleanerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        flat={selectedFlat}
        onAssign={onAssign}
      />
    </div>
  );
};
