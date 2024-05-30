import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditUserModal = ({ isOpen, user, onEdit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  }, [user]);

  const handleSubmit = () => {
    const updatedUser = { id: user.id, name, email, password };
    // Trigger the function passed from the parent component to handle the update logic
    onEdit(updatedUser);
    // Reset form fields and close modal
    setName('');
    setEmail('');
    setPassword('');
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} className="modal" overlayClassName="overlay">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Save</button>
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
