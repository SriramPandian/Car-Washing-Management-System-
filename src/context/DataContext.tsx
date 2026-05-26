import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location, Flat, Customer, Cleaner, WashRecord, AttendanceRecord, Review } from '../types';
import { 
  generateLocations, 
  generateFlats, 
  generateCustomers, 
  generateCleaners, 
  generateWashRecords 
} from '../utils/mockData';

interface Role {
  id: string;
  name: string;
  users: number;
  access: string;
}

interface DataContextType {
  locations: Location[];
  flats: Flat[];
  customers: Customer[];
  cleaners: Cleaner[];
  washes: WashRecord[];
  attendance: AttendanceRecord[];
  reviews: Review[];
  roles: Role[];
  
  // CRUD Actions
  addLocation: (loc: any) => void;
  updateLocation: (id: string, loc: any) => void;
  deleteLocation: (id: string) => void;
  
  addFlat: (flat: any) => void;
  updateFlat: (id: string, flat: any) => void;
  deleteFlat: (id: string) => void;
  
  addCustomer: (cust: any) => void;
  updateCustomer: (id: string, cust: any) => void;
  deleteCustomer: (id: string) => void;
  
  addCleaner: (cleaner: any) => void;
  updateCleaner: (id: string, cleaner: any) => void;
  deleteCleaner: (id: string) => void;

  addRole: (role: any) => void;
  updateRole: (id: string, role: any) => void;
  deleteRole: (id: string) => void;
  
  // Operations
  assignCleanerToFlat: (flatId: string, cleanerId: string) => void;
  unassignCleaner: (flatId: string) => void;
  startWash: (flatId: string) => void;
  completeWash: (washId: string, imageUrl?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [washes, setWashes] = useState<WashRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Super Admin', users: 2, access: 'Full Access' },
    { id: '2', name: 'Manager', users: 5, access: 'Operations Only' },
    { id: '3', name: 'Support', users: 3, access: 'View Only' },
  ]);

  // Initial Data Load
  useEffect(() => {
    const locs = generateLocations(5);
    const clns = generateCleaners(8);
    const custs = generateCustomers(12);
    const flts = generateFlats(20).map((f, i) => ({
      ...f,
      locationId: locs[i % locs.length].id,
      locationName: locs[i % locs.length].name,
      customerId: custs[i % custs.length].id,
      customerName: custs[i % custs.length].name,
      washStatus: i % 3 === 0 ? 'pending' : (i % 3 === 1 ? 'assigned' : 'completed') as any
    }));

    setLocations(locs);
    setCleaners(clns);
    setCustomers(custs);
    setFlats(flts);
    setWashes(generateWashRecords(15));
    
    // Mock Attendance from Mobile App
    const mockAttendance: AttendanceRecord[] = clns.slice(0, 6).map((c, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      cleanerId: c.id,
      cleanerName: c.name,
      employeeId: c.employeeId,
      checkIn: '08:15 AM',
      checkOut: index % 2 === 0 ? '05:30 PM' : undefined,
      totalHours: index % 2 === 0 ? '9h 15m' : undefined,
      status: 'present',
      date: new Date().toISOString().split('T')[0]
    }));
    setAttendance(mockAttendance);

    setReviews([
      { id: '1', washId: 'w1', customerName: 'John Doe', rating: 5, comment: 'Great job!', date: '2025-06-12' },
      { id: '2', washId: 'w2', customerName: 'Sarah Smith', rating: 4, comment: 'Very professional.', date: '2025-06-12' },
    ]);
  }, []);

  // Locations CRUD
  const addLocation = (loc: any) => setLocations([{ ...loc, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toLocaleDateString(), flatCount: 0 }, ...locations]);
  const updateLocation = (id: string, loc: any) => setLocations(locations.map(l => l.id === id ? { ...l, ...loc } : l));
  const deleteLocation = (id: string) => setLocations(locations.filter(l => l.id !== id));

  // Flats CRUD
  const addFlat = (flat: any) => setFlats([{ ...flat, id: Math.random().toString(36).substr(2, 9), washStatus: 'pending' }, ...flats]);
  const updateFlat = (id: string, flat: any) => setFlats(flats.map(f => f.id === id ? { ...f, ...flat } : f));
  const deleteFlat = (id: string) => setFlats(flats.filter(f => f.id !== id));

  // Customers CRUD
  const addCustomer = (cust: any) => setCustomers([{ ...cust, id: Math.random().toString(36).substr(2, 9) }, ...customers]);
  const updateCustomer = (id: string, cust: any) => setCustomers(customers.map(c => c.id === id ? { ...c, ...cust } : c));
  const deleteCustomer = (id: string) => setCustomers(customers.filter(c => c.id !== id));

  // Cleaners CRUD
  const addCleaner = (cleaner: any) => setCleaners([{ ...cleaner, id: Math.random().toString(36).substr(2, 9), assignedFlats: 0, currentWorkload: 0, attendanceStatus: 'absent' }, ...cleaners]);
  const updateCleaner = (id: string, cleaner: any) => setCleaners(cleaners.map(c => c.id === id ? { ...c, ...cleaner } : c));
  const deleteCleaner = (id: string) => setCleaners(cleaners.filter(c => c.id !== id));

  // Roles CRUD
  const addRole = (role: any) => setRoles([{ ...role, id: Math.random().toString(36).substr(2, 9) }, ...roles]);
  const updateRole = (id: string, role: any) => setRoles(roles.map(r => r.id === id ? { ...r, ...role } : r));
  const deleteRole = (id: string) => setRoles(roles.filter(r => r.id !== id));

  // Operations
  const assignCleanerToFlat = (flatId: string, cleanerId: string) => {
    const cleaner = cleaners.find(c => c.id === cleanerId);
    if (!cleaner) return;
    setFlats(prev => prev.map(f => f.id === flatId ? { ...f, washStatus: 'assigned', assignedCleanerId: cleanerId, assignedCleanerName: cleaner.name } : f));
    setCleaners(prev => prev.map(c => c.id === cleanerId ? { ...c, assignedFlats: c.assignedFlats + 1 } : c));
  };

  const unassignCleaner = (flatId: string) => {
    const flat = flats.find(f => f.id === flatId);
    if (flat?.assignedCleanerId) {
      setCleaners(prev => prev.map(c => c.id === flat.assignedCleanerId ? { ...c, assignedFlats: Math.max(0, c.assignedFlats - 1) } : c));
    }
    setFlats(prev => prev.map(f => f.id === flatId ? { ...f, washStatus: 'pending', assignedCleanerId: undefined, assignedCleanerName: undefined } : f));
  };

  const startWash = (flatId: string) => {
    const flat = flats.find(f => f.id === flatId);
    if (!flat) return;
    const newWash: WashRecord = {
      id: Math.random().toString(36).substr(2, 9),
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cleanerId: flat.assignedCleanerId || '',
      cleanerName: flat.assignedCleanerName || 'Staff',
      flatId: flat.id,
      flatNumber: flat.number,
      customerId: flat.customerId || '',
      customerName: flat.customerName || 'Customer',
      status: 'in-progress',
      date: new Date().toISOString().split('T')[0]
    };
    setWashes([newWash, ...washes]);
    setFlats(prev => prev.map(f => f.id === flatId ? { ...f, washStatus: 'assigned' } : f));
  };

  const completeWash = (washId: string, imageUrl?: string) => {
    const endTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWashes(prev => prev.map(w => w.id === washId ? { ...w, status: 'completed', endTime, duration: '35 mins', imageUrl: imageUrl || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=400' } : w));
    const wash = washes.find(w => w.id === washId);
    if (wash) setFlats(prev => prev.map(f => f.id === wash.flatId ? { ...f, washStatus: 'completed', lastWashDate: new Date().toLocaleDateString() } : f));
  };

  return (
    <DataContext.Provider value={{
      locations, flats, customers, cleaners, washes, attendance, reviews, roles,
      addLocation, updateLocation, deleteLocation,
      addFlat, updateFlat, deleteFlat,
      addCustomer, updateCustomer, deleteCustomer,
      addCleaner, updateCleaner, deleteCleaner,
      addRole, updateRole, deleteRole,
      assignCleanerToFlat, unassignCleaner, startWash, completeWash
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
