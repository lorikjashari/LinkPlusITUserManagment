import { X, AlertTriangle } from 'lucide-react';
import { User } from '../types/User';

interface DeleteConfirmModalProps {
  user: User;
  onConfirm: () => void;
  onClose: () => void;
}

function DeleteConfirmModal({ user, onConfirm, onClose }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 flex justify-between items-start border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Delete User</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">{user.name}</span>?
          </p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
        </div>

        <div className="p-6 bg-gray-50 flex gap-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
