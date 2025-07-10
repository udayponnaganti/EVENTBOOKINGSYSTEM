/*
  # Fix RLS policies for users table

  1. Security Changes
    - Add policy for anonymous users to insert new user records
    - This allows user registration during login process
    
  2. Notes
    - Anonymous users can only insert, not read existing users
    - Authenticated users maintain their existing read/update permissions
*/

-- Allow anonymous users to insert new user records
CREATE POLICY "Anonymous users can create accounts"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);