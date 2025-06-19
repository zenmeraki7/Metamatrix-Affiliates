import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Container,
  Stack,
  Avatar
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  Payment,
  History,
  Edit,
  GetApp,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Schedule,
  Pending,
  Store,
  AutoAwesome,
  CreditCard
} from '@mui/icons-material';

const Wallet = () => {
  const [withdrawalDialog, setWithdrawalDialog] = useState(false);
  const [editPayoutDialog, setEditPayoutDialog] = useState(false);
  const [expandedCommission, setExpandedCommission] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState({
    type: 'UPI',
    upiId: 'user@paytm',
    paypalEmail: '',
    bankAccount: ''
  });

  // Sample data
  const earningsData = {
    totalEarned: 8500,
    pendingCommissions: 1200,
    availableToWithdraw: 2000,
    lastPayoutDate: 'June 5, 2025',
    totalReferrals: 45,
    nextThreshold: 500
  };

  const payoutHistory = [
    { date: '2025-06-05', amount: 1500, status: 'Paid', method: 'UPI', transactionId: 'UPI123456789' },
    { date: '2025-05-01', amount: 2200, status: 'Paid', method: 'UPI', transactionId: 'UPI987654321' },
    { date: '2025-04-15', amount: 800, status: 'Processing', method: 'PayPal', transactionId: 'PP_PENDING_001' },
    { date: '2025-04-01', amount: 1800, status: 'Paid', method: 'UPI', transactionId: 'UPI456789123' }
  ];

  const commissionBreakdown = [
    { referral: 'techstore.myshop.com', amount: 450, date: '2025-06-18', status: 'Confirmed' },
    { referral: 'fashionhub.myshop.com', amount: 320, date: '2025-06-17', status: 'Confirmed' },
    { referral: 'gadgetworld.myshop.com', amount: 280, date: '2025-06-16', status: 'Pending' },
    { referral: 'bookstore.myshop.com', amount: 150, date: '2025-06-15', status: 'Confirmed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'Confirmed':
        return 'success';
      case 'Processing':
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
      case 'Confirmed':
        return <CheckCircle fontSize="small" />;
      case 'Processing':
        return <Schedule fontSize="small" />;
      case 'Pending':
        return <Pending fontSize="small" />;
      default:
        return null;
    }
  };

  const handleWithdrawalRequest = () => {
    setWithdrawalDialog(false);
    alert('Withdrawal request submitted successfully!');
  };

  const handleSavePayoutMethod = () => {
    setEditPayoutDialog(false);
    alert('Payout method updated successfully!');
  };

  const progressPercentage = Math.min((earningsData.availableToWithdraw / earningsData.nextThreshold) * 100, 100);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
              width: 48,
              height: 48
            }}>
              <AccountBalanceWallet />
            </Avatar>
            <Box>
              <Typography variant="h3" fontWeight="bold" sx={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}>
                Affiliate Wallet
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Monitor your commission status and manage payouts
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Earnings Summary Card */}
        <Card sx={{ 
          mb: 4,
          background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <TrendingUp sx={{ fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold">
                Earnings Summary
              </Typography>
            </Stack>
            
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                    ₹{earningsData.totalEarned.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Earned
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                    ₹{earningsData.pendingCommissions.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Pending Commissions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                    ₹{earningsData.availableToWithdraw.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Available to Withdraw
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    (≥ ₹{earningsData.nextThreshold} limit)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {earningsData.totalReferrals}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Referrals
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Last payout: {earningsData.lastPayoutDate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* Progress Bar */}
            <Box>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Progress to next payout threshold
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(progressPercentage)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#fff',
                    borderRadius: 4
                  }
                }} 
              />
            </Box>
          </CardContent>
        </Card>

        <Stack spacing={4}>
          {/* Payout History - Full Width */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ 
                    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                    width: 32,
                    height: 32
                  }}>
                    <History fontSize="small" />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Payout History
                  </Typography>
                </Stack>
                <Button 
                  startIcon={<GetApp />} 
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderColor: '#581c87',
                    color: '#581c87',
                    '&:hover': {
                      backgroundColor: 'rgba(88, 28, 135, 0.04)',
                      borderColor: '#581c87'
                    }
                  }}
                >
                  Export
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Method</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payoutHistory.map((payout, index) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            ₹{payout.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={getStatusIcon(payout.status)}
                            label={payout.status} 
                            color={getStatusColor(payout.status)} 
                            size="small"
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>{payout.method}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {payout.transactionId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

       

          {/* Bottom Row Cards - Full Width Grid */}
          <Grid container spacing={3}>
            {/* Request Withdrawal */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Avatar sx={{ 
                      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                      width: 32,
                      height: 32
                    }}>
                      <Payment fontSize="small" />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Withdraw Funds
                    </Typography>
                  </Stack>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Minimum withdrawal amount: ₹500
                  </Alert>
                  
                  <Box textAlign="center" sx={{ mb: 3 }}>
                    <Typography variant="h3" sx={{ 
                      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent',
                      fontWeight: 'bold',
                      mb: 1
                    }}>
                      ₹{earningsData.availableToWithdraw.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Balance
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    onClick={() => setWithdrawalDialog(true)}
                    disabled={earningsData.availableToWithdraw < earningsData.nextThreshold}
                    sx={{ 
                      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e293b 0%, #6b21a8 35%, #3730a3 100%)'
                      }
                    }}
                  >
                    Request Withdrawal
                  </Button>
                  
                  <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 2 }} color="text.secondary">
                    Payouts are processed within 2-3 business days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Payout Method */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ 
                        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                        width: 32,
                        height: 32
                      }}>
                        <CreditCard fontSize="small" />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        Payout Method
                      </Typography>
                    </Stack>
                    <IconButton 
                      onClick={() => setEditPayoutDialog(true)}
                      sx={{ 
                        color: '#581c87',
                        '&:hover': { backgroundColor: 'rgba(88, 28, 135, 0.04)' }
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Current Method
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                      {payoutMethod.type}
                    </Typography>
                    {payoutMethod.type === 'UPI' && (
                      <Typography variant="body2" color="text.secondary">
                        {payoutMethod.upiId}
                      </Typography>
                    )}
                    {payoutMethod.type === 'PayPal' && (
                      <Typography variant="body2" color="text.secondary">
                        {payoutMethod.paypalEmail}
                      </Typography>
                    )}
                  </Box>
                  
                  <Alert severity="warning">
                    Ensure your payout details are correct to avoid payment delays.
                  </Alert>
                </CardContent>
              </Card>
            </Grid>

            {/* Auto Payout Info */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                borderRadius: 3, 
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                height: '100%'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <CheckCircle sx={{ color: '#22c55e' }} />
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#15803d' }}>
                      Auto Payout Enabled
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#166534' }}>
                    Your balance will be paid out automatically on the 1st of every month if it exceeds ₹500.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>

        {/* Withdrawal Dialog */}
        <Dialog 
          open={withdrawalDialog} 
          onClose={() => setWithdrawalDialog(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Request Withdrawal
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Available Balance
              </Typography>
              <Typography variant="h4" sx={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                fontWeight: 'bold'
              }}>
                ₹{earningsData.availableToWithdraw.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Payout Method
              </Typography>
              <Typography variant="body2">
                {payoutMethod.type}: {payoutMethod.upiId}
              </Typography>
            </Box>
            <Alert severity="info">
              Your withdrawal request will be processed within 2-3 business days. You'll receive a confirmation email shortly.
            </Alert>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={() => setWithdrawalDialog(false)} sx={{ color: '#6b7280' }}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleWithdrawalRequest}
              sx={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e293b 0%, #6b21a8 35%, #3730a3 100%)'
                }
              }}
            >
              Confirm Withdrawal
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Payout Method Dialog */}
        <Dialog 
          open={editPayoutDialog} 
          onClose={() => setEditPayoutDialog(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Edit Payout Method
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Payout Method</InputLabel>
                <Select
                  value={payoutMethod.type}
                  label="Payout Method"
                  onChange={(e) => setPayoutMethod({ ...payoutMethod, type: e.target.value })}
                >
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                  <MenuItem value="Bank">Bank Account</MenuItem>
                </Select>
              </FormControl>

              {payoutMethod.type === 'UPI' && (
                <TextField
                  fullWidth
                  label="UPI ID"
                  value={payoutMethod.upiId}
                  onChange={(e) => setPayoutMethod({ ...payoutMethod, upiId: e.target.value })}
                  sx={{ mb: 2 }}
                />
              )}

              {payoutMethod.type === 'PayPal' && (
                <TextField
                  fullWidth
                  label="PayPal Email"
                  type="email"
                  value={payoutMethod.paypalEmail}
                  onChange={(e) => setPayoutMethod({ ...payoutMethod, paypalEmail: e.target.value })}
                  sx={{ mb: 2 }}
                />
              )}

              {payoutMethod.type === 'Bank' && (
                <TextField
                  fullWidth
                  label="Bank Account Details"
                  multiline
                  rows={3}
                  value={payoutMethod.bankAccount}
                  onChange={(e) => setPayoutMethod({ ...payoutMethod, bankAccount: e.target.value })}
                  placeholder="Account Number, IFSC Code, Bank Name"
                  sx={{ mb: 2 }}
                />
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={() => setEditPayoutDialog(false)} sx={{ color: '#6b7280' }}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSavePayoutMethod}
              sx={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e293b 0%, #6b21a8 35%, #3730a3 100%)'
                }
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Wallet;