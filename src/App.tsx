import { useState, useEffect } from 'react';
import { Users, UserPlus } from 'lucide-react';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import { User } from './types/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'add'>('list');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUserId(null);
  };

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Math.max(...users.map(u => u.id), 0) + 1,
    };
    setUsers([user, ...users]);
    setShowAddForm(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentView('list');
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
    setCurrentView('list');
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            </div>
            {currentView === 'list' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <UserPlus className="w-5 h-5" />
                Add User
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : currentView === 'list' ? (
          <UserList
            users={users}
            onViewUser={handleViewUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        ) : currentView === 'details' && selectedUser ? (
          <UserDetails
            user={selectedUser}
            onBack={handleBackToList}
            onEdit={(user) => {
              handleUpdateUser(user);
            }}
            onDelete={handleDeleteUser}
          />
        ) : null}
      </main>

      {showAddForm && (
        <UserForm
          onSubmit={handleAddUser}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
