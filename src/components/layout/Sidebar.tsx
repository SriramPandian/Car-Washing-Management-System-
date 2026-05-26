import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Droplets,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
}

const MenuItem = ({ icon: Icon, label, to, children, collapsed }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  if (children) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ${isOpen ? 'text-white bg-white/5' : ''}`}
        >
          <div className="flex items-center">
            <Icon size={20} className="min-w-[20px]" />
            {!collapsed && <span className="ml-3 font-medium">{label}</span>}
          </div>
          {!collapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        <AnimatePresence>
          {isOpen && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden ml-9 mt-1 space-y-1"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2.5 mb-1 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon size={20} className="min-w-[20px]" />
      {!collapsed && <span className="ml-3 font-medium">{label}</span>}
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-dark transition-all duration-300 z-50 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="p-6 flex items-center">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white shrink-0">
          <Droplets size={20} />
        </div>
        {!collapsed && (
          <span className="ml-3 text-white font-bold text-lg tracking-tight whitespace-nowrap">
            WashMaster <span className="text-primary-400">Pro</span>
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 mt-4 overflow-y-auto custom-scrollbar">
        <MenuItem icon={LayoutDashboard} label="Dashboard" to="/" collapsed={collapsed} />
        
        <MenuItem icon={Database} label="Masters" collapsed={collapsed}>
          <NavLink to="/masters/locations" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Locations</NavLink>
          <NavLink to="/masters/flats" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Flats</NavLink>
          <NavLink to="/masters/customers" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Customers</NavLink>
          <NavLink to="/masters/cleaners" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Cleaners</NavLink>
          <NavLink to="/masters/assignments" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Assignments</NavLink>
        </MenuItem>

        <MenuItem icon={Activity} label="Operations" collapsed={collapsed}>
          <NavLink to="/ops/available-flats" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Available Flats</NavLink>
          <NavLink to="/ops/daily-washes" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Daily Washes</NavLink>
          <NavLink to="/ops/attendance" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Attendance</NavLink>
        </MenuItem>

        <MenuItem icon={BarChart3} label="Reports" collapsed={collapsed}>
          <NavLink to="/reports/washes" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Wash Reports</NavLink>
          <NavLink to="/reports/attendance" className={({isActive}) => `block py-2 text-sm ${isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Attendance Reports</NavLink>
        </MenuItem>

        <MenuItem icon={Star} label="Reviews" to="/reviews" collapsed={collapsed} />
        <MenuItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center w-full px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
