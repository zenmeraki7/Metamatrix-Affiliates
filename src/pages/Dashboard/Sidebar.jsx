import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Badge,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as ReportsIcon,
  TrendingUp,
  Support as SupportIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Warning,
  ExitToApp
} from '@mui/icons-material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const Sidebar = ({ 
  selectedItem, 
  onItemSelect, 
  mobileOpen, 
  onMobileToggle 
}) => {
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const mainMenuItems = [
    { text: 'Overview', icon: <DashboardIcon />, notifications: 0 },
    { text: 'Tables', icon: <TableChartIcon />, notifications: 0 },
    { text: 'Wallets', icon: <AccountBalanceWalletIcon />, notifications: 3 },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, notifications: 0 }
  ];

  const handleItemClick = (itemText) => {
    onItemSelect(itemText);
    if (window.innerWidth < 600) {
      onMobileToggle();
    }
  };

  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    sessionStorage.clear();
    
    // Redirect to home page
    navigate('/');
    
    // Optional: Show logout success message
    console.log('User logged out successfully');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            color: 'white'
          }}
        >
          Dashboard
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />

      {/* Main Menu */}
      <Box sx={{ flex: 1, pt: 2, overflow: 'auto' }}>
        <List>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5, px: 1 }}>
              <ListItemButton
                selected={selectedItem === item.text}
                onClick={() => handleItemClick(item.text)}
                sx={{
                  borderRadius: 2,
                  color: 'white',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.notifications > 0 ? (
                    <Badge badgeContent={item.notifications} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: selectedItem === item.text ? 'bold' : 'normal',
                    color: 'white'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />

      {/* Bottom Menu */}
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5, px: 1 }}>
            <ListItemButton
              selected={selectedItem === item.text}
              onClick={() => handleItemClick(item.text)}
              sx={{
                borderRadius: 2,
                color: 'white',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: selectedItem === item.text ? 'bold' : 'normal',
                  color: 'white'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Logout */}
        <ListItem disablePadding sx={{ px: 1, pb: 2 }}>
          <ListItemButton
            onClick={handleLogoutClick}
            sx={{
              borderRadius: 2,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ color: 'white' }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            minWidth: '320px',
            background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255, 152, 0, 0.2)',
              border: '2px solid rgba(255, 152, 0, 0.5)',
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 2
            }}
          >
            <ExitToApp sx={{ fontSize: 28, color: '#ff9800' }} />
          </Avatar>
          <Typography variant="h5" component="div" fontWeight="bold" color="white">
            Confirm Logout
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <DialogContentText sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            Are you sure you want to sign out of your account? 
            You'll need to sign in again to access your dashboard.
          </DialogContentText>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', gap: 2, px: 3, pb: 2 }}>
          <Button
            onClick={handleLogoutCancel}
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 3,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            size="large"
             sx={{
              borderRadius: 2,
              px: 3,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
            borderRight: 'none'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;