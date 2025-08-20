import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import DataTable from '../components/DataTable';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/roles.json');
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      minWidth: 70,
      align: 'center',
    },
    {
      key: 'name',
      label: 'Role Name',
      minWidth: 120,
    },
    {
      key: 'description',
      label: 'Description',
      minWidth: 250,
    },
    {
      key: 'permissions',
      label: 'Permissions',
      minWidth: 200,
      type: 'array',
    },
    {
      key: 'userCount',
      label: 'Users',
      minWidth: 80,
      align: 'center',
    },
    {
      key: 'priority',
      label: 'Priority',
      minWidth: 80,
      align: 'center',
    },
    {
      key: 'isActive',
      label: 'Active',
      minWidth: 80,
      type: 'boolean',
      align: 'center',
    },
    {
      key: 'createdAt',
      label: 'Created',
      minWidth: 120,
      type: 'date',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>Loading roles...</div>
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
        data={roles}
        columns={columns}
        title="Role Management"
        searchFields={['name', 'description']}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default Roles;
