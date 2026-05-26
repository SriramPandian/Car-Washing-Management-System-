import React, { useState } from 'react';
import { Search, UserCheck, Clock, AlertCircle } from 'lucide-react';
import { BaseModal } from '../modals/BaseModal';
import { Button } from '../ui/Button';
import { Cleaner, Flat } from '../../types';
import { generateCleaners } from '../../utils/mockData';

interface AssignCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
  flat: Flat | null;
  onAssign: (cleanerId: string) => void;
}

export const AssignCleanerModal: React.FC<AssignCleanerModalProps> = ({ isOpen, onClose, flat, onAssign }) => {
  const [cleaners] = useState<Cleaner[]>(generateCleaners(6).map(c => ({
    ...c,
    currentWorkload: Math.floor(Math.random() * 10),
    maxWorkload: 12
  })));
  const [search, setSearch] = useState('');
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);

  const filteredCleaners = cleaners.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedCleaner) {
      onAssign(selectedCleaner);
      onClose();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`Assign Cleaner to Flat ${flat?.number}`} size="lg">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search cleaner by name or ID..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCleaners.map((cleaner) => {
            const isFull = cleaner.currentWorkload >= cleaner.maxWorkload;
            return (
              <div
                key={cleaner.id}
                onClick={() => !isFull && setSelectedCleaner(cleaner.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedCleaner === cleaner.id 
                    ? 'border-primary-600 bg-primary-50' 
                    : isFull ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' : 'border-gray-100 hover:border-primary-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-600 font-bold">
                    {cleaner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">{cleaner.name}</p>
                    <p className="text-xs text-gray-500">{cleaner.employeeId}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Today's Workload</span>
                    <span className={`font-bold ${isFull ? 'text-red-500' : 'text-dark'}`}>
                      {cleaner.currentWorkload} / {cleaner.maxWorkload}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${isFull ? 'bg-red-500' : 'bg-primary-600'}`}
                      style={{ width: `${(cleaner.currentWorkload / cleaner.maxWorkload) * 100}%` }}
                    />
                  </div>
                </div>

                {isFull && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase">
                    <AlertCircle size={12} /> Max Workload Reached
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Estimated start: 10:30 AM</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedCleaner}
              icon={<UserCheck size={18} />}
            >
              Confirm Assignment
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
