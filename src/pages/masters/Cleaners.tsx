import React, { useState } from 'react';
import { Plus, Search, Download, Edit2, Trash2, Eye, UserCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { BaseModal } from '../../components/modals/BaseModal';
import { DetailModal } from '../../components/modals/DetailModal';
import { exportToCSV } from '../../utils/exportUtils';

export const Cleaners: React.FC = () => {
  const { cleaners, addCleaner, updateCleaner, deleteCleaner } = useData();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', employeeId: '', status: 'active' });

  const filtered = cleaners.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.employeeId.includes(search)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCleaner) updateCleaner(selectedCleaner.id, formData);
    else addCleaner(formData);
    
    setIsModalOpen(false);
    setSelectedCleaner(null);
    setFormData({ name: '', mobile: '', employeeId: '', status: 'active' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Cleaners Management</h1>
        <Button icon={<Plus size={18} />} onClick={() => { setSelectedCleaner(null); setIsModalOpen(true); }}>Add Cleaner</Button>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" icon={<Download size={18} />} onClick={() => exportToCSV(cleaners, 'cleaners_list')}>Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Cleaner</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(cleaner => (
                <tr key={cleaner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">{cleaner.name.charAt(0)}</div>
                      <span className="font-semibold">{cleaner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{cleaner.employeeId}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cleaner.mobile}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${cleaner.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{cleaner.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedCleaner(cleaner); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-primary-600"><Eye size={16} /></button>
                      <button onClick={() => { setSelectedCleaner(cleaner); setFormData({ name: cleaner.name, mobile: cleaner.mobile, employeeId: cleaner.employeeId, status: cleaner.status }); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button onClick={() => { if(confirm('Delete cleaner?')) deleteCleaner(cleaner.id); }} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCleaner ? 'Edit Cleaner' : 'Add New Cleaner'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Full Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Employee ID" className="w-full p-2 border rounded" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} />
          <input required placeholder="Mobile Number" className="w-full p-2 border rounded" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button type="submit" className="w-full">Save Cleaner</Button>
        </form>
      </BaseModal>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="cleaner" data={selectedCleaner} />
    </div>
  );
};
