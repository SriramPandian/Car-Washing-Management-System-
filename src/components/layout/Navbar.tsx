import React from 'react';
import { Search, Bell, Mail, User, Menu, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search records, cleaners..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg w-64 focus:ring-2 focus:ring-primary-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Mail size={20} />
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-dark">Alex Johnson</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm group-hover:border-primary-200 transition-all">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
};
