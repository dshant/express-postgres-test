import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from '../components/UserList';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const IndexPage = () => {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users');
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      toast.success('User created successfully');
      fetchUsers();
      setShowCreateModal(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    }
  };

  const handleEditUser = async (userData) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to edit user');
      }
      toast.success('User edited successfully');
      fetchUsers();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to edit user');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/users/${selectedUser.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      toast.success('User deleted successfully');
      fetchUsers();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">User CRUD</h1>
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowCreateModal(true)}>Create User</button>
        </div>
        <UserList users={users} onEdit={(user) => { setSelectedUser(user); setShowEditModal(true); }} onDelete={(user) => { setSelectedUser(user); setShowDeleteConfirmation(true); }} />
        <CreateUserModal isOpen={showCreateModal} onCreate={handleCreateUser} onCancel={() => setShowCreateModal(false)} />
        {showEditModal && <EditUserModal isOpen={showEditModal} user={selectedUser} onEdit={handleEditUser} onCancel={() => setShowEditModal(false)} />}
        <DeleteConfirmationModal isOpen={showDeleteConfirmation} user={selectedUser} onDelete={handleDeleteUser} onCancel={() => setShowDeleteConfirmation(false)} />
      </div>
    </div>
  );
};

export default IndexPage;
