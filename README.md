# React Admin Console

A modern, responsive admin console built with React.js and Material-UI, featuring user management, role management, permissions, and organizational hierarchy.

## Features

- **Dashboard**: Overview with statistics and recent activity
- **User Management**: View and manage users with detailed information
- **Role Management**: Manage system roles and their permissions
- **Permission Management**: Control access rights and security levels
- **Hierarchy Management**: Organizational structure management
- **Responsive Design**: Works on desktop and mobile devices
- **Advanced Tables**: Sort, filter, and paginate data
- **Modern UI**: Clean Material-UI design with dark/light theme support

## Table Features

- **Sorting**: Click column headers to sort data
- **Filtering**: Search across multiple fields
- **Pagination**: Navigate through large datasets
- **Responsive**: Tables adapt to different screen sizes

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Layout.js          # Main layout with sidebar navigation
│   └── DataTable.js       # Reusable table component
├── pages/
│   ├── Dashboard.js       # Dashboard overview
│   ├── Users.js          # User management
│   ├── Roles.js          # Role management
│   ├── Permissions.js    # Permission management
│   └── Hierarchy.js      # Organizational hierarchy
├── App.js                # Main application component
└── index.js              # Application entry point

public/
└── data/
    ├── users.json        # User data
    ├── roles.json        # Role data
    ├── permissions.json  # Permission data
    └── hierarchy.json    # Hierarchy data
```

## Data Structure

### Users
- ID, username, email, first/last name
- Role, status, department, last login

### Roles
- ID, name, description, permissions
- User count, priority, active status

### Permissions
- ID, name, description, category
- Risk level, assigned roles, active status

### Hierarchy
- ID, name, title, level, parent ID
- Department, employee count, active status

## Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Add navigation item in `src/components/Layout.js`

### Modifying Data
- Edit the JSON files in `public/data/`
- Update table columns in the respective page components

### Styling
- Modify the theme in `src/App.js`
- Use Material-UI's `sx` prop for component-specific styling

## Technologies Used

- **React 18**: Modern React with hooks
- **Material-UI 5**: Component library and theming
- **React Router**: Client-side routing
- **JSON**: Data storage and management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own admin console needs.
