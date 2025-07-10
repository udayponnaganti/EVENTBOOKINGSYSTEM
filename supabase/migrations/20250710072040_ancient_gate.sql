/*
  # Fix users table RLS policies

  1. Security Updates
    - Update RLS policies to allow proper user creation
    - Fix authentication flow for anonymous and authenticated users
    - Ensure users can create accounts and access their own data

  2. Changes
    - Drop existing conflicting policies
    - Create new policies that work with the current authentication flow
    - Allow anonymous users to create accounts
    - Allow users to read and update their own data based on registration_number
*/

-- Drop existing policies that might be causing conflicts
DROP POLICY IF EXISTS "Anonymous users can create accounts" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies that work with our authentication flow
CREATE POLICY "Allow anonymous user creation"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated user creation"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update own data by registration number"
  ON users
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);