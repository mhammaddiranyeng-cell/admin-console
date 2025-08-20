import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  VpnKey as VpnKeyIcon,
  AccountTree as AccountTreeIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    roles: 0,
    permissions: 0,
    hierarchy: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch data from JSON files
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes, permissionsRes, hierarchyRes] = await Promise.all([
          fetch('/data/users.json'),
          fetch('/data/roles.json'),
          fetch('/data/permissions.json'),
          fetch('/data/hierarchy.json'),
        ]);

        const users = await usersRes.json();
        const roles = await rolesRes.json();
        const permissions = await permissionsRes.json();
        const hierarchy = await hierarchyRes.json();

        setStats({
          users: users.length,
          roles: roles.length,
          permissions: permissions.length,
          hierarchy: hierarchy.length,
        });

        // Generate recent activity from users data
        const activity = users
          .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
          .slice(0, 5)
          .map(user => ({
            id: user.id,
            text: `${user.firstName} ${user.lastName} logged in`,
            time: new Date(user.lastLogin).toLocaleString(),
            type: 'login',
          }));

        setRecentActivity(activity);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<PeopleIcon sx={{ color: 'white' }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Roles"
            value={stats.roles}
            icon={<SecurityIcon sx={{ color: 'white' }} />}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Permissions"
            value={stats.permissions}
            icon={<VpnKeyIcon sx={{ color: 'white' }} />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hierarchy Levels"
            value={stats.hierarchy}
            icon={<AccountTreeIcon sx={{ color: 'white' }} />}
            color="#7b1fa2"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Add New User" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Create New Role" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Manage Permissions" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountTreeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Update Hierarchy" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
