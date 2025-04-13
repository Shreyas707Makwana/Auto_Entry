/*
  # Create Hostel Gate Management Tables

  1. New Tables
    - `students`
      - `id` (text, primary key) - Student ID
      - `name` (text) - Student name
      - `room_number` (text) - Hostel room number
      - `mobile` (text) - Contact number
    
    - `guard_entries`
      - `entry_id` (uuid, primary key) - Unique entry identifier
      - `student_id` (text, foreign key) - Reference to students table
      - `out_time` (timestamptz) - When student left
      - `in_time` (timestamptz, nullable) - When student returned
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (read/write) as this is a gate management system
*/

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id text PRIMARY KEY,
  name text NOT NULL,
  room_number text NOT NULL,
  mobile text NOT NULL
);

-- Enable RLS on students table
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to students
CREATE POLICY "Allow public read access to students"
  ON public.students
  FOR SELECT
  TO public
  USING (true);

-- Create guard entries table
CREATE TABLE IF NOT EXISTS public.guard_entries (
  entry_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL REFERENCES public.students(id),
  out_time timestamptz NOT NULL DEFAULT now(),
  in_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on guard_entries table
ALTER TABLE public.guard_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for guard_entries
CREATE POLICY "Allow public read access to guard entries"
  ON public.guard_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to guard entries"
  ON public.guard_entries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to guard entries"
  ON public.guard_entries
  FOR UPDATE
  TO public
  USING (true);