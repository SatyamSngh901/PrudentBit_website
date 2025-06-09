// pages/index.tsx
import { useEffect, useState } from 'react';
import { User } from '../types/data';
import { fetchData } from '../utils/fetchData';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'card' | 'row'>('card');

  useEffect(() => {
    fetchData()
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleViewChange = (val: string) => {
    if (val === 'card' || val === 'row') {
      setView(val);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User List</h1>

        <ToggleGroup type="single" value={view} onValueChange={handleViewChange}>
          <ToggleGroupItem value="card" aria-label="Card View" className="text-black">
            Card View
          </ToggleGroupItem>
          <ToggleGroupItem value="row" aria-label="Row View" className="text-black">
            Row View
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                </div>
              </div>
              <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-700"><strong>Phone:</strong> {user.phone}</p>
              <p className="text-sm text-gray-700"><strong>City:</strong> {user.address.city}</p>
              <p
                className="text-sm font-medium rounded-md px-3 py-1 mt-3 inline-block"
                style={{
                  backgroundColor: user.medicalIssue === 'Fever' ? '#FEF3C7' :
                                   user.medicalIssue === 'Headache' ? '#E0E7FF' :
                                   '#F3F4F6',
                  color: '#1F2937'
                }}
              >
                Medical Issue: {user.medicalIssue}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-black">
            <thead className="bg-gray-50 text-black font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">City</th>
                <th className="px-6 py-3 text-left">Medical Issue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-black">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.company.name}</td>
                  <td className="px-6 py-4">{user.address.city}</td>
                  <td className="px-6 py-4">
                    <span
                      className="rounded-md px-2 py-1 text-sm"
                      style={{
                        backgroundColor: user.medicalIssue === 'Fever' ? '#FEF3C7' :
                                         user.medicalIssue === 'Headache' ? '#E0E7FF' :
                                         '#F3F4F6',
                        color: '#1F2937'
                      }}
                    >
                      {user.medicalIssue}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default HomePage;
