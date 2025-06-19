import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Button,
  Card,
  CardContent,
  Grid,
  TablePagination,
  useTheme,
  alpha,
  Container,
  Stack,
  createTheme,
  ThemeProvider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Groups as GroupsIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

// Custom theme with purple color
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#581c87', // Your custom purple color
      light: '#7c3aed',
      dark: '#3b0764',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#6d28d9',
    },
  },
});

// Sample data - replace with your actual data
const sampleReferrals = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    code: 'REF001',
    joinedAt: '2024-01-15T10:30:00Z',
    status: 'active',
    referralCount: 5
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    code: 'REF002',
    joinedAt: '2024-02-20T14:15:00Z',
    status: 'active',
    referralCount: 3
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    code: 'REF003',
    joinedAt: '2024-03-10T09:45:00Z',
    status: 'pending',
    referralCount: 1
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    code: 'REF004',
    joinedAt: '2024-04-05T16:20:00Z',
    status: 'active',
    referralCount: 8
  },
  {
    id: 5,
    name: 'Eva Brown',
    email: 'eva.brown@email.com',
    code: 'REF005',
    joinedAt: '2024-05-12T11:30:00Z',
    status: 'inactive',
    referralCount: 0
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank.miller@email.com',
    code: 'REF006',
    joinedAt: '2024-06-01T08:15:00Z',
    status: 'active',
    referralCount: 12
  }
];

function ReferralTable({ referrals = sampleReferrals }) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter referrals based on search term
  const filteredReferrals = referrals.filter(ref =>
    ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter(ref => ref.status === 'active').length;
  const totalReferralCount = referrals.reduce((sum, ref) => sum + ref.referralCount, 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            color: 'primary.main',
            mb: 1
          }}
        >
          Referral Management
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage and track your referral program participants
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                    {totalReferrals}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Referrals
                  </Typography>
                </Box>
                <Avatar sx={{ 
                  backgroundColor: 'primary.main',
                  width: 56,
                  height: 56
                }}>
                  <GroupsIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 0.5 }}>
                    {activeReferrals}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Active Referrals
                  </Typography>
                </Box>
                <Avatar sx={{ 
                  backgroundColor: 'success.main',
                  width: 56,
                  height: 56
                }}>
                  <TrendingUpIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main', mb: 0.5 }}>
                    {totalReferralCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Referral Count
                  </Typography>
                </Box>
                <Avatar sx={{ 
                  backgroundColor: 'info.main',
                  width: 56,
                  height: 56
                }}>
                  <AssessmentIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table Card */}
      <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {/* Enhanced Toolbar */}
        <Toolbar 
          sx={{ 
            px: 3, 
            py: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
          }}
        >
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 600, color: 'primary.main' }}>
            Referral Directory
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: 280,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper'
                }
              }}
            />
            <Tooltip title="Filter Results">
              <IconButton 
                color="primary"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Data">
              <IconButton 
                color="primary"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <ExportIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 2
              }}
            >
              Add New Referral
            </Button>
          </Stack>
        </Toolbar>

        {/* Enhanced Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: alpha(theme.palette.grey[50], 0.8),
                '& .MuiTableCell-head': {
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }
              }}>
                <TableCell>Referrer Details</TableCell>
                <TableCell>Contact Information</TableCell>
                <TableCell>Referral Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Performance</TableCell>
                <TableCell>Join Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReferrals.length > 0 ? (
                filteredReferrals
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ref, index) => (
                    <TableRow 
                      key={ref.id} 
                      hover
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          transform: 'translateY(-1px)',
                          boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.1)}`
                        },
                        transition: 'all 0.2s ease-in-out',
                        '&:last-child td': { border: 0 }
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ 
                            width: 48, 
                            height: 48,
                            backgroundColor: 'primary.main',
                            fontSize: '1rem',
                            fontWeight: 700
                          }}>
                            {getInitials(ref.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {ref.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Member #{ref.id.toString().padStart(3, '0')}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {ref.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={ref.code} 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            color: 'primary.main'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={ref.status.charAt(0).toUpperCase() + ref.status.slice(1)} 
                          color={getStatusColor(ref.status)}
                          size="small"
                          sx={{ 
                            fontWeight: 600,
                            minWidth: 80
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {ref.referralCount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            referrals
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(ref.joinedAt)}
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                        No referrals found
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first referral'}
                      </Typography>
                      {!searchTerm && (
                        <Button
                          variant="contained"
                          startIcon={<PersonAddIcon />}
                          sx={{ mt: 2 }}
                        >
                          Add First Referral
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Enhanced Pagination */}
        {filteredReferrals.length > 0 && (
          <Box sx={{ 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            backgroundColor: alpha(theme.palette.grey[50], 0.5)
          }}>
            <TablePagination
              component="div"
              count={filteredReferrals.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{ 
                '& .MuiTablePagination-toolbar': {
                  paddingLeft: 3,
                  paddingRight: 3
                }
              }}
            />
          </Box>
        )}
      </Card>
    </Container>
    </ThemeProvider>
  );
}

export default ReferralTable;