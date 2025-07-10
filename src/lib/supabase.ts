import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here' || supabaseAnonKey === 'your_supabase_anon_key_here') {
  throw new Error('Supabase environment variables are not configured. Please click "Connect to Supabase" in the top right to set up your Supabase connection.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          registration_number: string
          name: string
          email: string
          department: string
          created_at: string
        }
        Insert: {
          id?: string
          registration_number: string
          name: string
          email: string
          department: string
          created_at?: string
        }
        Update: {
          id?: string
          registration_number?: string
          name?: string
          email?: string
          department?: string
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          event_id: string
          user_id: string
          registration_numbers: string[]
          booking_date: string
          status: 'confirmed' | 'pending' | 'cancelled'
          ticket_count: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          registration_numbers: string[]
          booking_date: string
          status: 'confirmed' | 'pending' | 'cancelled'
          ticket_count: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          registration_numbers?: string[]
          booking_date?: string
          status?: 'confirmed' | 'pending' | 'cancelled'
          ticket_count?: number
          created_at?: string
        }
      }
    }
  }
}