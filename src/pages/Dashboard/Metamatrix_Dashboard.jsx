import React, { useState } from 'react';


// import AnalyticsPage from './AnalyticsPage';
// import UsersPage from './UsersPage';
import {
  Typography,
  Paper,
  Container
} from '@mui/material';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Settings from './Settings';

// Generic component for pages that don't have specific components yet
const GenericPage = ({ pageName }) => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        {pageName}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to the {pageName} page! You've selected: <strong>{pageName}</strong>
      </Typography>
      
      <Paper 
        elevation={2}
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          minHeight: 400,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
          {pageName} Content
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is where the {pageName} content would be displayed. You can replace this component with your specific {pageName} components, charts, tables, or forms.
        </Typography>
      </Paper>
    </Container>
  );
};

const Metamatrix_Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  // Function to render the appropriate page component
  const renderPageContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Users':
        return <UsersPage />;
      case 'Products':
        return <GenericPage pageName="Products" />;
      case 'Orders':
        return <GenericPage pageName="Orders" />;
      case 'Sales Report':
        return <GenericPage pageName="Sales Report" />;
      case 'User Analytics':
        return <GenericPage pageName="User Analytics" />;
      case 'Performance':
        return <GenericPage pageName="Performance" />;
      case 'Support':
        return <GenericPage pageName="Support" />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      selectedItem={selectedItem} 
      onItemSelect={handleItemSelect}
    >
      {renderPageContent()}
    </Layout>
  );
};

export default Metamatrix_Dashboard;