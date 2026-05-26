import React from 'react';
import { BaseModal } from './BaseModal';
import { User, MapPin, Home, Car, Clock, Star, FileText, Calendar, Smartphone, Shield, Info } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'location' | 'flat' | 'customer' | 'cleaner' | 'wash' | 'attendance';
  data: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, type, data }) => {
  if (!data) return null;

  const renderContent = () => {
    switch (type) {
      case 'wash':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  data.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>{data.status}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Date</p>
                <p className="font-bold text-dark">{data.date}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600"><User size={20} /></div>
                <div><p className="text-[10px] text-gray-400 uppercase font-bold">Cleaner</p><p className="font-bold text-dark">{data.cleanerName}</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><Home size={20} /></div>
                <div><p className="text-[10px] text-gray-400 uppercase font-bold">Flat & Customer</p><p className="font-bold text-dark">{data.flatNumber} - {data.customerName}</p></div>
              </div>
            </div>
            {data.imageUrl && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Wash Proof Image</p>
                <img src={data.imageUrl} alt="Wash Proof" className="w-full h-48 object-cover rounded-xl shadow-sm" />
              </div>
            )}
          </div>
        );
      case 'flat':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
              <p className="text-xs font-bold text-primary-600 uppercase mb-1">Flat Details</p>
              <h4 className="text-xl font-bold text-dark">{data.number}</h4>
              <p className="text-sm text-gray-600">{data.locationName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl">
                <p className="text-xs text-gray-500">Occupancy</p>
                <p className="font-bold text-dark capitalize">{data.status}</p>
              </div>
              <div className="p-4 border rounded-xl">
                <p className="text-xs text-gray-500">Wash Status</p>
                <p className="font-bold text-primary-600 capitalize">{data.washStatus}</p>
              </div>
            </div>
            {data.customerName && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Assigned Customer</p>
                <p className="font-bold text-dark">{data.customerName}</p>
              </div>
            )}
          </div>
        );
      case 'cleaner':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {data.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-dark">{data.name}</h4>
                <p className="text-sm text-gray-500">ID: {data.employeeId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Contact</p>
                <p className="font-bold text-dark">{data.mobile}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Assigned Units</p>
                <p className="font-bold text-dark">{data.assignedFlats} Flats</p>
              </div>
            </div>
            <div className="p-4 border border-green-100 bg-green-50 rounded-xl flex items-center justify-between">
              <span className="text-sm font-bold text-green-700">Current Status</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-green-600 uppercase">{data.status}</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center">
            <Info className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Detailed information for this record is being compiled.</p>
          </div>
        );
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`${type.charAt(0).toUpperCase() + type.slice(1)} Details`} size="md">
      {renderContent()}
    </BaseModal>
  );
};
