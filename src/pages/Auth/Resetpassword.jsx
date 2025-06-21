import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  Link,
  CircularProgress
} from '@mui/material';
import {
  Lock,
  Visibility,
  VisibilityOff,
  VpnKey,
  CheckCircle
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // Get reset token from URL
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call like:
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password: formData.password })
      // });

      setResetSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

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
                  {resetSuccess ? (
                    <CheckCircle sx={{ fontSize: 32 }} />
                  ) : (
                    <VpnKey sx={{ fontSize: 32 }} />
                  )}
                </Box>
                <Typography variant="h4" gutterBottom>
                  {resetSuccess ? 'Password Reset' : 'Reset Password'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {resetSuccess 
                    ? 'Your password has been successfully reset'
                    : 'Enter your new password below'
                  }
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {resetSuccess ? (
                  <Box textAlign="center">
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Your password has been successfully reset! 
                      You will be redirected to the login page in a few seconds.
                    </Alert>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/login')}
                      sx={{
                        py: 1.5,
                        px: 4,
                        background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                        },
                      }}
                    >
                      Go to Login
                    </Button>
                  </Box>
                ) : (
                  <>
                    {errors.general && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {errors.general}
                      </Alert>
                    )}

                    <TextField
                      fullWidth
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
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
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Password must be at least 8 characters and contain uppercase, lowercase, and numeric characters.
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={isLoading}
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
                          Resetting Password...
                        </Box>
                      ) : (
                        <>
                          <VpnKey sx={{ mr: 1 }} />
                          Reset Password
                        </>
                      )}
                    </Button>
                  </>
                )}

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