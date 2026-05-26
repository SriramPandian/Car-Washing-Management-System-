import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit2, Trash2, Home, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { BaseModal } from '../../components/modals/BaseModal';
import { DetailModal } from '../../components/modals/DetailModal';
import { exportToCSV } from '../../utils/exportUtils';

export const Flats: React.FC = () => {
  const { flats, locations, addFlat, updateFlat, deleteFlat } = useData();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState<any>(null);
  const [formData, setFormData] = useState({ number: '', locationId: '', status: 'occupied' });

  const filteredFlats = flats.filter(f => 
    f.number.toLowerCase().includes(search.toLowerCase()) || 
    f.locationName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = locations.find(l => l.id === formData.locationId);
    const data = { ...formData, locationName: loc?.name || 'Unknown' };
    
    if (selectedFlat) updateFlat(selectedFlat.id, data);
    else addFlat(data);
    
    setIsModalOpen(false);
    setSelectedFlat(null);
    setFormData({ number: '', locationId: '', status: 'occupied' });
  };

  const handleEdit = (flat: any) => {
    setSelectedFlat(flat);
    setFormData({ number: flat.number, locationId: flat.locationId, status: flat.status });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Flats Management</h1>
        <Button icon={<Plus size={18} />} onClick={() => { setSelectedFlat(null); setIsModalOpen(true); }}>Add Flat</Button>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search flats..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" icon={<Download size={18} />} onClick={() => exportToCSV(flats, 'flats_list')}>Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Flat Number</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFlats.map(flat => (
                <tr key={flat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{flat.number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.locationName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${flat.status === 'occupied' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{flat.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedFlat(flat); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-primary-600"><Eye size={16} /></button>
                      <button onClick={() => handleEdit(flat)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button onClick={() => { if(confirm('Delete this flat?')) deleteFlat(flat.id); }} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedFlat ? 'Edit Flat' : 'Add New Flat'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flat Number</label>
            <input required placeholder="e.g. A-101" className="w-full p-2 border rounded" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select required className="w-full p-2 border rounded" value={formData.locationId} onChange={e => setFormData({...formData, locationId: e.target.value})}>
              <option value="">Select Location</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save Flat</Button>
        </form>
      </BaseModal>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="flat" data={selectedFlat} />
    </div>
  );
};
