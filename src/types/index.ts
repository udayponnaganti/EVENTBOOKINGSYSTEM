export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  dutyLeave: 'FULL DAY DL' | 'HALF DAY DL' | 'NO DL';
  dutyLeave: 'FULL DAY DL' | 'HALF DAY DL' | 'NO DL';
  image: string;
  availableTickets: number;
  totalTickets: number;
  featured: boolean;
}

export interface User {
  registrationNumber: string;
  name: string;
  email: string;
  department: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  registrationNumbers: string[];
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  ticketCount: number;
}

export interface LoginCredentials {
  registrationNumber: string;
  password: string;
}