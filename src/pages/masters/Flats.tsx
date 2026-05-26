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
  const [formData, setFormData] = useState({ flatName: '', blockName: '', number: '', parkingCount: 0, membersOccupied: 0, locationId: '', status: 'active' });

  const filteredFlats = flats.filter(f => 
    f.number.toLowerCase().includes(search.toLowerCase()) || 
    f.flatName?.toLowerCase().includes(search.toLowerCase()) ||
    f.blockName?.toLowerCase().includes(search.toLowerCase()) ||
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
    setFormData({ flatName: '', blockName: '', number: '', parkingCount: 0, membersOccupied: 0, locationId: '', status: 'active' });
  };

  const handleEdit = (flat: any) => {
    setSelectedFlat(flat);
    setFormData({ 
      flatName: flat.flatName || '', 
      blockName: flat.blockName || '', 
      number: flat.number || '', 
      parkingCount: flat.parkingCount || 0, 
      membersOccupied: flat.membersOccupied || 0, 
      locationId: flat.locationId || '', 
      status: flat.status || 'active' 
    });
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
                <th className="px-6 py-4">Flat Name</th>
                <th className="px-6 py-4">Block</th>
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Parking</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFlats.map(flat => (
                <tr key={flat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{flat.flatName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.blockName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{flat.number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.locationName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.parkingCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{flat.membersOccupied}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${flat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{flat.status}</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select required className="w-full p-2 border rounded" value={formData.locationId} onChange={e => setFormData({...formData, locationId: e.target.value})}>
              <option value="">Select Location</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flat Name</label>
            <input required placeholder="e.g. Rose" className="w-full p-2 border rounded" value={formData.flatName} onChange={e => setFormData({...formData, flatName: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Block Name</label>
            <input required placeholder="e.g. A" className="w-full p-2 border rounded" value={formData.blockName} onChange={e => setFormData({...formData, blockName: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flat Number</label>
            <input required placeholder="e.g. 101" type="number" className="w-full p-2 border rounded" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parking Count</label>
            <input required placeholder="e.g. 1" type="number" min="0" className="w-full p-2 border rounded" value={formData.parkingCount} onChange={e => setFormData({...formData, parkingCount: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Members Occupied</label>
            <input required placeholder="e.g. 4" type="number" min="0" className="w-full p-2 border rounded" value={formData.membersOccupied} onChange={e => setFormData({...formData, membersOccupied: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save Flat</Button>
        </form>
      </BaseModal>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="flat" data={selectedFlat} />
    </div>
  );
};
