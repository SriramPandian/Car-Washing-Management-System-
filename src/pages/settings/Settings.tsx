import React, { useState } from 'react';
import { User, Shield, Bell, Save, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';
import { BaseModal } from '../../components/modals/BaseModal';

export const Settings: React.FC = () => {
  const { roles, addRole, updateRole, deleteRole } = useData();
  const [activeTab, setActiveTab] = useState('profile');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleForm, setRoleForm] = useState({ name: '', access: 'View Only' });

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) updateRole(selectedRole.id, roleForm);
    else addRole({ ...roleForm, users: 0 });
    
    setIsRoleModalOpen(false);
    setSelectedRole(null);
    setRoleForm({ name: '', access: 'View Only' });
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setRoleForm({ name: role.name, access: role.access });
    setIsRoleModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <Button icon={<Save size={18} />}>Save Changes</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-1">
          {[
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'roles', label: 'Roles & Permissions', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="p-8 space-y-6">
              <h3 className="text-lg font-bold text-dark">Admin Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input defaultValue="Alex Johnson" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input defaultValue="alex@washmaster.com" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'roles' && (
            <Card className="p-0">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold text-dark">User Roles</h3>
                <Button size="sm" icon={<Plus size={16} />} onClick={() => { setSelectedRole(null); setIsRoleModalOpen(true); }}>Add Role</Button>
              </div>
              <div className="divide-y">
                {roles.map(role => (
                  <div key={role.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-bold text-dark">{role.name}</p>
                      <p className="text-xs text-gray-500">{role.users} Users • <span className="text-primary-600 font-semibold">{role.access}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditRole(role)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => { if(confirm('Delete this role?')) deleteRole(role.id); }} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <BaseModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} title={selectedRole ? 'Edit Role' : 'Add New Role'}>
        <form onSubmit={handleRoleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input required placeholder="e.g. Supervisor" className="w-full p-2 border rounded-lg" value={roleForm.name} onChange={e => setRoleForm({...roleForm, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
            <select className="w-full p-2 border rounded-lg" value={roleForm.access} onChange={e => setRoleForm({...roleForm, access: e.target.value})}>
              <option>Full Access</option>
              <option>Operations Only</option>
              <option>View Only</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Save Role</Button>
        </form>
      </BaseModal>
    </div>
  );
};
