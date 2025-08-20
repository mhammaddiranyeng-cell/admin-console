import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import DataTable from '../components/DataTable';

function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/permissions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch permissions');
        }
        const data = await response.json();
        setPermissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
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
      label: 'Permission',
      minWidth: 120,
    },
    {
      key: 'description',
      label: 'Description',
      minWidth: 250,
    },
    {
      key: 'category',
      label: 'Category',
      minWidth: 120,
    },
    {
      key: 'riskLevel',
      label: 'Risk Level',
      minWidth: 100,
    },
    {
      key: 'assignedRoles',
      label: 'Assigned Roles',
      minWidth: 200,
      type: 'array',
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
        <div>Loading permissions...</div>
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
        data={permissions}
        columns={columns}
        title="Permission Management"
        searchFields={['name', 'description', 'category']}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default Permissions;
