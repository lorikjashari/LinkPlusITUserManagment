import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Eye, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { User } from '../types/User';
import EditUserModal from './EditUserModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface UserListProps {
  users: User[];
  onViewUser: (userId: number) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
}

type SortField = 'name' | 'email' | 'company';
type SortOrder = 'asc' | 'desc';

function UserList({ users, onViewUser, onUpdateUser, onDeleteUser }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal: string, bVal: string;

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'email':
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case 'company':
          aVal = a.company?.name?.toLowerCase() || '';
          bVal = b.company?.name?.toLowerCase() || '';
          break;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, sortField, sortOrder]);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
              </select>
            </div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4 opacity-30">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onViewUser(user.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
              <p className="text-sm text-gray-600 mb-3 break-words">{user.email}</p>
              <div className="pt-3 border-t border-gray-200 mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">{user.company?.name || 'N/A'}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewUser(user.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingUser(user);
                  }}
                  className="flex items-center justify-center gap-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingUser(user);
                  }}
                  className="flex items-center justify-center gap-1 border border-red-300 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={onUpdateUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onConfirm={() => {
            onDeleteUser(deletingUser.id);
            setDeletingUser(null);
          }}
          onClose={() => setDeletingUser(null)}
        />
      )}
    </div>
  );
}

export default UserList;
