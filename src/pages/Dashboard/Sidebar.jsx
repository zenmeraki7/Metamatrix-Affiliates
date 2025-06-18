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
  

} from '@mui/icons-material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const drawerWidth = 280;

const Sidebar = ({ 
  selectedItem, 
  onItemSelect, 
  mobileOpen, 
  onMobileToggle 
}) => {
  const [reportsOpen, setReportsOpen] = useState(false);

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
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                console.log('Logout functionality would be implemented here');
              }
            }}
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
            bgcolor: '#1976d2'
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
            bgcolor: '#1976d2',
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