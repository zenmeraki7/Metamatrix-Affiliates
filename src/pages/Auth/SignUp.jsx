import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  OutlinedInput,
  TextField,
  Typography,
  Alert,
  Collapse,
  Chip,
  Fade,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Check
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function MUISignUpForm() {
  const navigate =  useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: 'error' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const strengths = [
      { strength: 0, text: '', color: 'error' },
      { strength: 1, text: 'Very Weak', color: 'error' },
      { strength: 2, text: 'Weak', color: 'warning' },
      { strength: 3, text: 'Fair', color: 'info' },
      { strength: 4, text: 'Good', color: 'primary' },
      { strength: 5, text: 'Strong', color: 'success' }
    ];
    
    return { ...strengths[score], percentage: (score / 5) * 100 };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try{
const { name, email, password } = formData;
const response = await axios.post('http://localhost:58307/referral/affiliate-usersignup', {
  name,
  email,
  password,
});
console.log('Response:', response);

if (response.status === 200) {
  setShowSuccess(true);
  setTimeout(() => {
    setShowSuccess(false);
    navigate('/verify-email'); 
  }, 3000);
}
    }
 catch (error) {
  setIsLoading(false);
  const message = error.response?.data?.message || 'Failed to create account. Please try again.';
  setErrors({ form: message });
  setShowError(true);

  // Auto-close after 4 seconds
  setTimeout(() => {
    setShowError(false);
  }, 4000);
}

  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Fade in timeout={600}>
            <Card elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent sx={{ p: 4 }}>
                {/* Header */}
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    <Box
                      component="span"
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Create Account
                    </Box>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Join us and start your journey
                  </Typography>
                </Box>
{/* Error Alert */}
<Collapse in={!!errors.form}>
  <Alert
    severity="error"
    onClose={() => setErrors(prev => ({ ...prev, form: '' }))}
    sx={{ mb: 3, borderRadius: 2 }}
  >
    {errors.form}
  </Alert>
</Collapse>

                {/* Success Alert */}
                <Collapse in={showSuccess}>
                  <Alert
                    severity="success"
                    icon={<Check />}
                    sx={{ mb: 3, borderRadius: 2 }}
                  >
                    Account created successfully! Welcome aboard!
                  </Alert>
                </Collapse>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { mb: 3 } }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl fullWidth variant="outlined" error={!!errors.password}>
                    <InputLabel>Set New Password</InputLabel>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Set New Password"
                    />
                    {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <Box mt={1}>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength.percentage}
                          color={passwordStrength.color}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                          <Typography variant="caption" color="text.secondary">
                            {passwordStrength.text}
                          </Typography>
                          <Chip
                            label={passwordStrength.text}
                            size="small"
                            color={passwordStrength.color}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    )}
                  </FormControl>
                  
                  <FormControl fullWidth variant="outlined" error={!!errors.confirmPassword}>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    {errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    // onClick={()=>navigate('/verify-email')}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                      },
                    }}
                  >
                    {isLoading ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={20} color="inherit" />
                        Creating...
                      </Box>
                    ) : 'Create Account'}
                  </Button>
                </Box>

                {/* Login Link */}
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link href="/login" color="primary" sx={{ fontWeight: 600 }}>
                      Sign in here
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}