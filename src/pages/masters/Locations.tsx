import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit2, Trash2, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { BaseModal } from '../../components/modals/BaseModal';
import { DetailModal } from '../../components/modals/DetailModal';
import { exportToCSV } from '../../utils/exportUtils';

export const Locations: React.FC = () => {
  const { locations, addLocation, updateLocation, deleteLocation } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', status: 'active' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLoc) updateLocation(selectedLoc.id, formData);
    else addLocation(formData);
    setIsModalOpen(false);
    setSelectedLoc(null);
    setFormData({ name: '', status: 'active' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Locations</h1>
        <Button icon={<Plus size={18} />} onClick={() => { setSelectedLoc(null); setFormData({ name: '', status: 'active' }); setIsModalOpen(true); }}>Add Location</Button>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none" />
          </div>
          <Button variant="outline" icon={<Download size={18} />} onClick={() => exportToCSV(locations, 'locations')}>Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {locations.map(loc => (
                <tr key={loc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{loc.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${loc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{loc.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedLoc(loc); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-primary-600"><Eye size={16} /></button>
                      <button onClick={() => { setSelectedLoc(loc); setFormData({ name: loc.name, status: loc.status }); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button onClick={() => { if (confirm('Delete?')) deleteLocation(loc.id); }} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedLoc ? 'Edit Location' : 'Add Location'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </BaseModal>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="location" data={selectedLoc} />
    </div>
  );
};
