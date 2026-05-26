export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
  avatar?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  flatCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Flat {
  id: string;
  number: string;
  locationId: string;
  locationName: string;
  customerId?: string;
  customerName?: string;
  vehicleCount: number;
  vehicleDetails?: string;
  status: 'occupied' | 'vacant';
  washStatus: 'pending' | 'assigned' | 'completed';
  lastWashDate?: string;
  preferredSlot?: string;
  assignedCleanerId?: string;
  assignedCleanerName?: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  flatId: string;
  flatNumber: string;
  vehicles: string[];
  cleanerId?: string;
  cleanerName?: string;
  status: 'active' | 'inactive';
}

export interface Cleaner {
  id: string;
  name: string;
  mobile: string;
  employeeId: string;
  assignedFlats: number;
  currentWorkload: number;
  maxWorkload: number;
  attendanceStatus: 'present' | 'absent' | 'on-leave';
  status: 'active' | 'inactive';
}

export interface WashRecord {
  id: string;
  startTime: string;
  endTime?: string;
  cleanerId: string;
  cleanerName: string;
  flatId: string;
  flatNumber: string;
  customerId: string;
  customerName: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'pending' | 'missed';
  imageUrl?: string;
  date: string;
  rating?: number;
  review?: string;
}

export interface AttendanceRecord {
  id: string;
  cleanerId: string;
  cleanerName: string;
  employeeId: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  date: string;
}

export interface Review {
  id: string;
  washId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}
