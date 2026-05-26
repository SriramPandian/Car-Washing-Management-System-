import React, { useState } from 'react';
import { Search, Filter, UserCheck, Home, Link2, Unlink, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { generateCleaners, generateFlats } from '../../utils/mockData';

export const Assignments: React.FC = () => {
  const [cleaners] = useState(generateCleaners(8));
  const [flats] = useState(generateFlats(12));
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(cleaners[0].id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Work Assignments</h1>
          <p className="text-sm text-gray-500">Assign cleaners to specific flats and societies</p>
        </div>
        <Button variant="primary" icon={<Link2 size={18} />}>Bulk Assignment</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cleaner Selection List */}
        <Card className="p-0 lg:col-span-1 h-fit">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-dark mb-3">Select Cleaner</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search staff..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            {cleaners.map((cleaner) => (
              <button
                key={cleaner.id}
                onClick={() => setSelectedCleaner(cleaner.id)}
                className={`w-full flex items-center justify-between p-4 transition-colors border-b border-gray-50 last:border-0 ${
                  selectedCleaner === cleaner.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary-600 font-bold">
                    {cleaner.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${selectedCleaner === cleaner.id ? 'text-primary-700' : 'text-dark'}`}>
                      {cleaner.name}
                    </p>
                    <p className="text-xs text-gray-500">{cleaner.assignedFlats} Flats Assigned</p>
                  </div>
                </div>
                <ChevronRight size={16} className={selectedCleaner === cleaner.id ? 'text-primary-600' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </Card>

        {/* Assignment Grid */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-dark">
                Assigned Flats for <span className="text-primary-600">
                  {cleaners.find(c => c.id === selectedCleaner)?.name}
                </span>
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filter</Button>
                <Button variant="outline" size="sm" icon={<Unlink size={14} />}>Unassign All</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {flats.slice(0, 6).map((flat) => (
                <div key={flat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Home size={16} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{flat.number}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{flat.locationName}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Unlink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-bold text-dark mb-4">Available Flats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {flats.slice(6, 12).map((flat) => (
                <div key={flat.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Home size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">{flat.number}</p>
                      <p className="text-[10px] text-gray-400">{flat.locationName}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-primary-100 text-primary-700 text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
