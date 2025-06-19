import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Container,
  ButtonGroup,
  Stack,
  IconButton,
  alpha,
  useTheme
} from '@mui/material';
import {
  AttachMoney,
  People,
  TrendingUp,
  TrendingDown,
  Timeline,
  AccountBalance,
  Refresh,
  Download,
  Settings
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Overview = () => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('6M');

  const stats = {
    totalEarnings: 28500,
    pendingEarnings: 4500,
    totalReferrals: 247,
    activeReferrals: 42,
    conversionRate: 18.2,
    thisMonthEarnings: 7500,
    lastMonthEarnings: 6200,
    clickThroughRate: 3.8,
    avgOrderValue: 1299
  };

  const monthlyEarningsData = [
    { month: 'Jan', earnings: 3200, referrals: 12 },
    { month: 'Feb', earnings: 4100, referrals: 18 },
    { month: 'Mar', earnings: 5300, referrals: 24 },
    { month: 'Apr', earnings: 4800, referrals: 19 },
    { month: 'May', earnings: 6200, referrals: 28 },
    { month: 'Jun', earnings: 7500, referrals: 35 }
  ];

  const statusData = [
    { name: 'Converted', value: 89, color: '#2e7d32' },
    { name: 'Pending', value: 42, color: '#ed6c02' },
    { name: 'Active', value: 78, color: '#1976d2' },
    { name: 'Expired', value: 38, color: '#d32f2f' }
  ];

  const calculateGrowth = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const MetricCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.05)} 0%, ${alpha(theme.palette[color].main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          border: `1px solid ${alpha(theme.palette[color].main, 0.3)}`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box flex={1}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px',
                fontSize: '0.75rem'
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: `${color}.main`,
                mt: 1,
                mb: 0.5
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box 
            sx={{ 
              bgcolor: `${color}.main`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {React.cloneElement(icon, { sx: { color: 'white', fontSize: 24 } })}
          </Box>
        </Box>
        
        {trend && (
          <Box display="flex" alignItems="center" mt={2}>
            <Box 
              display="flex" 
              alignItems="center" 
              sx={{ 
                bgcolor: trend === 'up' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                borderRadius: 1,
                px: 1,
                py: 0.5
              }}
            >
              {trend === 'up' ? (
                <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600,
                  color: trend === 'up' ? 'success.main' : 'error.main'
                }}
              >
                {trendValue}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Timeline sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Referral Dashboard
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton color="inherit">
              <Refresh />
            </IconButton>
            <IconButton color="inherit">
              <Download />
            </IconButton>
            <IconButton color="inherit">
              <Settings />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
        {/* Welcome Section */}
        <Box mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Good morning! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your referral program today.
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard 
              title="Total Earnings" 
              value={`₹${stats.totalEarnings.toLocaleString()}`} 
              subtitle={`₹${stats.pendingEarnings.toLocaleString()} pending`}
              icon={<AttachMoney />}
              color="success"
              trend="up"
              trendValue={calculateGrowth(stats.thisMonthEarnings, stats.lastMonthEarnings)}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard 
              title="Total Referrals" 
              value={stats.totalReferrals} 
              subtitle={`${stats.activeReferrals} active this month`}
              icon={<People />}
              color="info"
              trend="up"
              trendValue="12.5"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard 
              title="Conversion Rate" 
              value={`${stats.conversionRate}%`} 
              subtitle="Above industry average"
              icon={<TrendingUp />}
              color="primary"
              trend="up"
              trendValue="2.3"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard 
              title="Avg Order Value" 
              value={`₹${stats.avgOrderValue}`} 
              subtitle="Per converted referral"
              icon={<AccountBalance />}
              color="warning"
              trend="up"
              trendValue="5.1"
            />
          </Grid>
        </Grid>

        {/* Charts Section - Equal Width */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Performance Chart - Now 6 columns */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: 450 }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Performance Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monthly earnings and referral trends
                    </Typography>
                  </Box>
                  <ButtonGroup size="small" variant="outlined">
                    {['3M', '6M', '1Y'].map((period) => (
                      <Button
                        key={period}
                        variant={selectedPeriod === period ? 'contained' : 'outlined'}
                        onClick={() => setSelectedPeriod(period)}
                        sx={{ minWidth: 40 }}
                      >
                        {period}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
                
                <Box sx={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyEarningsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.2)} />
                      <XAxis 
                        dataKey="month" 
                        stroke={theme.palette.text.secondary}
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        yAxisId="left" 
                        stroke={theme.palette.text.secondary}
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke={theme.palette.text.secondary}
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: theme.shape.borderRadius,
                          boxShadow: theme.shadows[4]
                        }}
                      />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="earnings" 
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorEarnings)" 
                        name="Earnings (₹)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="referrals" 
                        stroke={theme.palette.success.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 4 }}
                        name="Referrals"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Distribution - Now 6 columns */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: 450 }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Referral Status Distribution
                </Typography>
                
                <Box sx={{ height: 240, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: theme.shape.borderRadius,
                          boxShadow: theme.shadows[4]
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <Box mt={3}>
                  <Grid container spacing={2}>
                    {statusData.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Box 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="space-between" 
                          p={1.5}
                          sx={{ 
                            borderRadius: 1,
                            backgroundColor: alpha(item.color, 0.05),
                            border: `1px solid ${alpha(item.color, 0.2)}`
                          }}
                        >
                          <Box display="flex" alignItems="center">
                            <Box 
                              sx={{ 
                                width: 12, 
                                height: 12, 
                                borderRadius: '50%', 
                                backgroundColor: item.color,
                                mr: 1 
                              }} 
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                              {item.name}
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: item.color }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Overview;