import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import DataTable from '../components/DataTable';

function Hierarchy() {
  const [hierarchy, setHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/hierarchy.json');
        if (!response.ok) {
          throw new Error('Failed to fetch hierarchy');
        }
        const data = await response.json();
        setHierarchy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHierarchy();
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
      label: 'Name',
      minWidth: 120,
    },
    {
      key: 'title',
      label: 'Title',
      minWidth: 200,
    },
    {
      key: 'level',
      label: 'Level',
      minWidth: 80,
      align: 'center',
    },
    {
      key: 'parentId',
      label: 'Parent ID',
      minWidth: 100,
      align: 'center',
    },
    {
      key: 'department',
      label: 'Department',
      minWidth: 150,
    },
    {
      key: 'employeeCount',
      label: 'Employees',
      minWidth: 100,
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
        <div>Loading hierarchy...</div>
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
        data={hierarchy}
        columns={columns}
        title="Organizational Hierarchy"
        searchFields={['name', 'title', 'department']}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default Hierarchy;
