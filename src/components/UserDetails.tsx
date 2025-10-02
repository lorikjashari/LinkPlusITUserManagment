import { ArrowLeft, CreditCard as Edit2, Trash2, Phone, Globe, Building, MapPin } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types/User';
import EditUserModal from './EditUserModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface UserDetailsProps {
  user: User;
  onBack: () => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

function UserDetails({ user, onBack, onEdit, onDelete }: UserDetailsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Users
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
          <p className="text-blue-100">{user.email}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {user.username && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Username
                </div>
                <div className="text-gray-900">{user.username}</div>
              </div>
            )}

            {user.phone && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </div>
                <div className="text-gray-900">{user.phone}</div>
              </div>
            )}

            {user.website && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Website
                </div>
                <div className="text-gray-900">{user.website}</div>
              </div>
            )}

            {user.company?.name && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  Company
                </div>
                <div className="text-gray-900">{user.company.name}</div>
              </div>
            )}

            {user.address && (
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Address
                </div>
                <div className="text-gray-900">
                  {user.address.street && <div>{user.address.street}</div>}
                  {user.address.suite && <div>{user.address.suite}</div>}
                  {(user.address.city || user.address.zipcode) && (
                    <div>
                      {user.address.city}
                      {user.address.city && user.address.zipcode && ', '}
                      {user.address.zipcode}
                    </div>
                  )}
                </div>
              </div>
            )}

            {user.company?.catchPhrase && (
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Company Catchphrase
                </div>
                <div className="text-gray-900 italic">{user.company.catchPhrase}</div>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit User
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete User
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditUserModal
          user={user}
          onSave={(updatedUser) => {
            onEdit(updatedUser);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          user={user}
          onConfirm={() => {
            onDelete(user.id);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default UserDetails;
