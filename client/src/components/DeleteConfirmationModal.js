import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmationModal = ({ isOpen, onDelete, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className="modal" overlayClassName="overlay">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2">Delete</button>
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;