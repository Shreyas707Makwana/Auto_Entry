import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Entry {
  entry_id: string;
  student_id: string;
  out_time: string;
  in_time: string | null;
  students: {
    name: string;
  };
}

function Table() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('guard_entries')
      .select(`
        *,
        students (
          name
        )
      `)
      .order('out_time', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800/30 backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8">Entry/Exit Records</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Out Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  In Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {entries.map((entry) => (
                <tr key={entry.entry_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {entry.student_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {entry.students?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDateTime(entry.out_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {entry.in_time ? formatDateTime(entry.in_time) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.in_time
                          ? 'bg-green-900/50 text-green-400'
                          : 'bg-red-900/50 text-red-400'
                      }`}
                    >
                      {entry.in_time ? 'Returned' : 'Out'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="text-center py-4">
              <p className="text-gray-400">Loading entries...</p>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-400">No entries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table