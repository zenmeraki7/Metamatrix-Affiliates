import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  InputAdornment,
  IconButton,
  Chip,
  LinearProgress,
  Link,
  Fade,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Send,
  Check,
  ArrowBack,
  Security,
  MailOutline
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
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
  },
});

export default function Forgotpassword() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = ['Enter Email', 'Check Email', 'New Password', 'Complete'];

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

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (currentStep === 2) {
      if (!formData.newPassword) {
        newErrors.newPassword = 'Password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, 1500);
    }
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

  const passwordStrength = getPasswordStrength(formData.newPassword);

  
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
              {/* Header */}
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  color: 'white',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Lock sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  {currentStep === 0 && "Reset Password"}
                  {currentStep === 1 && "Check Your Email"}
                  {currentStep === 2 && "New Password"}
                  {currentStep === 3 && "Success!"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {currentStep === 0 && "Enter your email to receive a reset link"}
                  {currentStep === 1 && "We've sent a reset link to your email"}
                  {currentStep === 2 && "Create a new secure password"}
                  {currentStep === 3 && "Your password has been reset successfully"}
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {/* Stepper */}
                <Box mb={4}>
                  <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>
                          <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {label}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                {/* Step Content */}
                <Box>
                  {/* Step 1: Email Input */}
                  {currentStep === 0 && (
                    <Box>
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
                        sx={{ mb: 3 }}
                      />
                    </Box>
                  )}

                  {/* Step 2: Email Sent Confirmation */}
                  {currentStep === 1 && (
                    <Box textAlign="center">
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <MailOutline sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                      
                      <Typography variant="h5" gutterBottom>
                        Check Your Email
                      </Typography>
                      
                      <Typography variant="body1" color="text.secondary" paragraph>
                        We've sent a password reset link to <strong>{formData.email}</strong>
                      </Typography>
                      
                      <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
                        <Typography variant="body2">
                          <strong>Next steps:</strong><br />
                          1. Check your email inbox (and spam folder)<br />
                          2. Click the reset link in the email<br />
                          3. You'll be redirected to create a new password
                        </Typography>
                      </Alert>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Didn't receive the email?
                      </Typography>
                      <Button
                        variant="text"
                        onClick={() => setCurrentStep(0)}
                        startIcon={<Send />}
                      >
                        Try Different Email
                      </Button>
                    </Box>
                  )}

                  {/* Step 3: New Password */}
                  {currentStep === 2 && (
                    <Box>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      
                      {/* Password Strength */}
                      {formData.newPassword && (
                        <Box mb={3}>
                          <LinearProgress
                            variant="determinate"
                            value={passwordStrength.percentage}
                            color={passwordStrength.color}
                            sx={{ height: 6, borderRadius: 3, mb: 1 }}
                          />
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              Password Strength
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
                      
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  )}

                  {/* Step 4: Success */}
                  {currentStep === 3 && (
                    <Box textAlign="center">
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'success.main',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <Check sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom color="success.main">
                        Password Reset Complete!
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        Your password has been successfully reset. You can now sign in with your new password.
                      </Typography>
         
                      <Button
                        variant="contained"
                        size="large"
                       onClick={() => navigate('/login')}
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                          },
                        }}
                      >
                        Continue to Sign In
                      </Button>
                   
                      
                    </Box>
                  )}

                  {/* Navigation Buttons */}
                  {(currentStep === 0 || currentStep === 2) && (
                    <Box>
                      <Divider sx={{ my: 3 }} />
                      <Box display="flex" gap={2}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={isLoading}
                          fullWidth
                          sx={{
                            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                            },
                          }}
                        >
                          {isLoading ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <CircularProgress size={20} color="inherit" />
                              {currentStep === 0 ? 'Sending...' : 'Updating...'}
                            </Box>
                          ) : (
                            <>
                              {currentStep === 0 ? 'Send Email' : 'Reset Password'}
                            </>
                          )}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Footer */}
                <Box textAlign="center" mt={4}>
                  <Typography variant="body2" color="text.secondary">
                    Remember your password?{' '}
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