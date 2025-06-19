import React, { useState } from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';

const drawerWidth = 280;

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1976d2',
          color: 'white',
        },
      },
    },
  },
});

const Layout = ({ children, selectedItem, onItemSelect }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Mobile menu button */}
        <Box 
          sx={{ 
            display: { xs: 'block', sm: 'none' }, 
            position: 'fixed', 
            top: 16, 
            left: 16, 
            zIndex: 1300 
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'primary.main' }}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Sidebar */}
        <Sidebar
          selectedItem={selectedItem}
          onItemSelect={onItemSelect}
          mobileOpen={mobileOpen}
          onMobileToggle={handleDrawerToggle}
        />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: 'background.default',
            minHeight: '100vh',
            pt: { xs: 8, sm: 3 }
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;