/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (text, primary key)
      - `event_id` (text)
      - `user_id` (text)
      - `registration_numbers` (text array)
      - `booking_date` (text)
      - `status` (text)
      - `ticket_count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS bookings (
  id text PRIMARY KEY,
  event_id text NOT NULL,
  user_id text NOT NULL,
  registration_numbers text[] NOT NULL,
  booking_date text NOT NULL,
  status text NOT NULL CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  ticket_count integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::text);