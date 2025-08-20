import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import DataTable from '../components/DataTable';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/users.json');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      minWidth: 70,
      align: 'center',
    },
    {
      key: 'username',
      label: 'Username',
      minWidth: 120,
    },
    {
      key: 'firstName',
      label: 'First Name',
      minWidth: 120,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      minWidth: 120,
    },
    {
      key: 'email',
      label: 'Email',
      minWidth: 200,
    },
    {
      key: 'role',
      label: 'Role',
      minWidth: 100,
    },
    {
      key: 'department',
      label: 'Department',
      minWidth: 120,
    },
    {
      key: 'status',
      label: 'Status',
      minWidth: 100,
      type: 'status',
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      minWidth: 150,
      type: 'datetime',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>Loading users...</div>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <DataTable
        data={users}
        columns={columns}
        title="User Management"
        searchFields={['username', 'firstName', 'lastName', 'email', 'department']}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default Users;
