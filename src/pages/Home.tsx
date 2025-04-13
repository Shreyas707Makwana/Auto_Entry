import React, { useState } from 'react';
import { Search, LogIn, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface Student {
  id: string;
  name: string;
  room_number: string;
  mobile: string;
}

function Home() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  const searchStudent = async () => {
    if (!studentId) {
      toast.error('Please enter a student ID');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (error || !data) {
      toast.error('Student not found');
      setStudent(null);
    } else {
      setStudent(data);
    }
    setLoading(false);
  };

  const handleEntry = async (type: 'entry' | 'exit') => {
    if (!student) return;

    if (type === 'exit') {
      // Check if student already has a pending entry
      const { data: pendingEntry } = await supabase
        .from('guard_entries')
        .select('*')
        .eq('student_id', student.id)
        .is('in_time', null)
        .single();

      if (pendingEntry) {
        toast.error('Student is already out');
        return;
      }

      // Create new exit entry
      const { error } = await supabase
        .from('guard_entries')
        .insert([{ student_id: student.id }]);

      if (error) {
        toast.error('Failed to record exit');
      } else {
        toast.success('Exit recorded successfully');
        // Clear student data after successful action
        setStudent(null);
        setStudentId('');
      }
    } else {
      // Find pending entry to update
      const { data: pendingEntry } = await supabase
        .from('guard_entries')
        .select('*')
        .eq('student_id', student.id)
        .is('in_time', null)
        .single();

      if (!pendingEntry) {
        toast.error('No pending exit found');
        return;
      }

      // Update entry with in_time
      const { error } = await supabase
        .from('guard_entries')
        .update({ in_time: new Date().toISOString() })
        .eq('entry_id', pendingEntry.entry_id);

      if (error) {
        toast.error('Failed to record entry');
      } else {
        toast.success('Entry recorded successfully');
        // Clear student data after successful action
        setStudent(null);
        setStudentId('');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/30 backdrop-blur-md rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Hostel Gate Management
        </h1>
        
        <div className="flex gap-4 mb-8">
          <div>
            <p style={{ color: 'white' }}>Student ID:</p>
          </div>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Try std01 or std02"
            className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <button
            onClick={searchStudent}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </div>

        {student && (
          <div className="bg-gray-800/30 backdrop-blur-md rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Student Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-medium text-white">{student.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Room Number</p>
                <p className="font-medium text-white">{student.room_number}</p>
              </div>
              <div>
                <p className="text-gray-400">Mobile</p>
                <p className="font-medium text-white">{student.mobile}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleEntry('exit')}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Mark Exit
              </button>
              <button
                onClick={() => handleEntry('entry')}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Mark Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home
