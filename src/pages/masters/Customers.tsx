import React, { useState } from 'react';
import { Plus, Search, Download, Edit2, Trash2, Eye, Phone } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { BaseModal } from '../../components/modals/BaseModal';
import { DetailModal } from '../../components/modals/DetailModal';
import { exportToCSV } from '../../utils/exportUtils';

export const Customers: React.FC = () => {
  const { customers, locations, addCustomer, updateCustomer, deleteCustomer } = useData();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', locationId: '', flatName: '', blockName: '', flatNumber: '', status: 'active' });

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.mobile.includes(search)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = locations.find(l => l.id === formData.locationId);
    const data = { ...formData, locationName: loc?.name || '', vehicles: ['Sedan'] };
    
    if (selectedCust) updateCustomer(selectedCust.id, data);
    else addCustomer(data);
    
    setIsModalOpen(false);
    setSelectedCust(null);
    setFormData({ name: '', mobile: '', locationId: '', flatName: '', blockName: '', flatNumber: '', status: 'active' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Customers</h1>
        <Button icon={<Plus size={18} />} onClick={() => { setSelectedCust(null); setIsModalOpen(true); }}>Add Customer</Button>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" icon={<Download size={18} />} onClick={() => exportToCSV(customers, 'customers_list')}>Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Flat</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(cust => (
                <tr key={cust.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{cust.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cust.mobile}</td>
                  <td className="px-6 py-4 text-sm font-medium">{cust.flatNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${cust.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{cust.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedCust(cust); setIsDetailOpen(true); }} className="p-2 text-gray-400 hover:text-primary-600"><Eye size={16} /></button>
                      <button onClick={() => { setSelectedCust(cust); setFormData({ name: cust.name, mobile: cust.mobile, locationId: cust.locationId || '', flatName: cust.flatName || '', blockName: cust.blockName || '', flatNumber: cust.flatNumber || '', status: cust.status }); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button onClick={() => { if(confirm('Delete customer?')) deleteCustomer(cust.id); }} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCust ? 'Edit Customer' : 'Add New Customer'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Full Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Mobile Number" className="w-full p-2 border rounded" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          <select required className="w-full p-2 border rounded" value={formData.locationId} onChange={e => setFormData({...formData, locationId: e.target.value})}>
            <option value="">Select Location</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <input required placeholder="Flat Name e.g. Rose" className="w-full p-2 border rounded" value={formData.flatName} onChange={e => setFormData({...formData, flatName: e.target.value})} />
          <input required placeholder="Block Name e.g. A" className="w-full p-2 border rounded" value={formData.blockName} onChange={e => setFormData({...formData, blockName: e.target.value})} />
          <input required placeholder="Flat Number" className="w-full p-2 border rounded" value={formData.flatNumber} onChange={e => setFormData({...formData, flatNumber: e.target.value})} />
          <select className="w-full p-2 border rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button type="submit" className="w-full">Save Customer</Button>
        </form>
      </BaseModal>

      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} type="customer" data={selectedCust} />
    </div>
  );
};
