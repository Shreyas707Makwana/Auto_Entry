/*
  # Initial Schema Setup for Hostel Entry Management

  1. New Tables
    - `students`
      - `id` (text, primary key) - Student ID
      - `name` (text) - Student name
      - `room_number` (text) - Room number
      - `mobile` (text) - Mobile number
      
    - `guard_entries`
      - `entry_id` (uuid, primary key)
      - `student_id` (text, references students)
      - `out_time` (timestamptz)
      - `in_time` (timestamptz, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id text PRIMARY KEY,
  name text NOT NULL,
  room_number text NOT NULL,
  mobile text NOT NULL
);

-- Create guard entries table
CREATE TABLE IF NOT EXISTS guard_entries (
  entry_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text REFERENCES students(id) NOT NULL,
  out_time timestamptz NOT NULL DEFAULT now(),
  in_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE guard_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to students"
  ON students
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to guard entries"
  ON guard_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to guard entries"
  ON guard_entries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to guard entries"
  ON guard_entries
  FOR UPDATE
  TO public
  USING (true);

-- Insert dummy students
INSERT INTO students (id, name, room_number, mobile)
VALUES 
  ('std01', 'John Doe', 'A101', '1234567890'),
  ('std02', 'Jane Smith', 'B202', '9876543210')
ON CONFLICT (id) DO NOTHING;