import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, Booking } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('lpu-user');
    const storedBookings = localStorage.getItem('lpu-bookings');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Validate registration number format (up to 8 digits)
      if (!credentials.registrationNumber || !credentials.password || 
          !/^\d{1,8}$/.test(credentials.registrationNumber)) {
        return false;
      }

      // First, try to find existing user
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('registration_number', credentials.registrationNumber)
        .single();

      let user: User;

      if (existingUser) {
        // User exists, use existing data
        user = {
          registrationNumber: existingUser.registration_number,
          name: existingUser.name,
          email: existingUser.email,
          department: existingUser.department
        };
      } else {
        // User doesn't exist, create new user
        const newUserData = {
          registration_number: credentials.registrationNumber,
          name: `Student ${credentials.registrationNumber}`,
          email: `${credentials.registrationNumber}@lpu.in`,
          department: 'Computer Science'
        };

        const { data: createdUser, error: createError } = await supabase
          .from('users')
          .insert([newUserData])
          .select()
          .single();

        if (createError) {
          console.error('Error creating user:', createError);
          return false;
        }

        user = {
          registrationNumber: createdUser.registration_number,
          name: createdUser.name,
          email: createdUser.email,
          department: createdUser.department
        };
      }

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('lpu-user', JSON.stringify(user));
      
      // Load user's bookings
      await loadUserBookings(credentials.registrationNumber);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loadUserBookings = async (registrationNumber: string) => {
    try {
      const { data: userBookings, error } = await supabase
        .from('bookings')
        .select('*')
        .contains('registration_numbers', [registrationNumber])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading bookings:', error);
        return;
      }

      const formattedBookings: Booking[] = userBookings.map(booking => ({
        id: booking.id,
        eventId: booking.event_id,
        userId: booking.user_id || registrationNumber,
        registrationNumbers: booking.registration_numbers,
        bookingDate: booking.booking_date,
        status: booking.status,
        ticketCount: booking.ticket_count
      }));

      setBookings(formattedBookings);
      localStorage.setItem('lpu-bookings', JSON.stringify(formattedBookings));
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setBookings([]);
    localStorage.removeItem('lpu-user');
    localStorage.removeItem('lpu-bookings');
  };

  const addBooking = async (booking: Booking) => {
    try {
      const bookingData = {
        id: booking.id,
        event_id: booking.eventId,
        user_id: booking.userId || user?.registrationNumber,
        registration_numbers: booking.registrationNumbers,
        booking_date: booking.bookingDate,
        status: booking.status,
        ticket_count: booking.ticketCount
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) {
        console.error('Error saving booking:', error);
        // Continue with local storage even if Supabase fails
      }

      const newBookings = [...bookings, booking];
      setBookings(newBookings);
      localStorage.setItem('lpu-bookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Error adding booking:', error);
      // Still add to local state for demo purposes
      const newBookings = [...bookings, booking];
      setBookings(newBookings);
      localStorage.setItem('lpu-bookings', JSON.stringify(newBookings));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, bookings, addBooking }}>
      {children}
    </AuthContext.Provider>
  );
};