import { faker } from '@faker-js/faker';
import { Location, Flat, Customer, Cleaner, WashRecord } from '../types';

export const generateLocations = (count: number): Location[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name() + ' Residency',
    flatCount: faker.number.int({ min: 50, max: 500 }),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    createdAt: faker.date.past().toLocaleDateString(),
  }));
};

export const generateFlats = (count: number): Flat[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    number: faker.number.int({ min: 101, max: 999 }).toString(),
    flatName: faker.helpers.arrayElement(['Rose', 'Tulip', 'Lotus', 'Orchid']),
    blockName: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
    locationId: faker.string.uuid(),
    locationName: faker.company.name() + ' Residency',
    parkingCount: faker.number.int({ min: 0, max: 3 }),
    membersOccupied: faker.number.int({ min: 1, max: 6 }),
    customerName: faker.person.fullName(),
    vehicleCount: faker.number.int({ min: 1, max: 3 }),
    status: faker.helpers.arrayElement(['occupied', 'vacant']),
  }));
};

export const generateCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    mobile: faker.phone.number(),
    flatId: faker.string.uuid(),
    flatNumber: faker.helpers.arrayElement(['A', 'B', 'C']) + '-' + faker.number.int({ min: 101, max: 505 }),
    vehicles: [faker.vehicle.model(), faker.vehicle.model()].slice(0, faker.number.int({ min: 1, max: 2 })),
    cleanerName: faker.person.fullName(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  }));
};

export const generateCleaners = (count: number): Cleaner[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    mobile: faker.phone.number(),
    employeeId: 'EMP' + faker.number.int({ min: 1000, max: 9999 }),
    assignedFlats: faker.number.int({ min: 5, max: 20 }),
    attendanceStatus: faker.helpers.arrayElement(['present', 'absent', 'on-leave']),
    status: 'active',
  }));
};

export const generateWashRecords = (count: number): WashRecord[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    startTime: '08:30 AM',
    endTime: '09:15 AM',
    cleanerName: faker.person.fullName(),
    flatNumber: 'B-' + faker.number.int({ min: 101, max: 999 }),
    customerName: faker.person.fullName(),
    duration: '45 mins',
    status: faker.helpers.arrayElement(['completed', 'in-progress', 'pending']),
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=200',
  }));
};
