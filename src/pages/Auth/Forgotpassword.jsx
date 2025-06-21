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
  Email,
  Send,
  Lock
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/baseUrl';

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

export default function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      setErrors('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors('Please enter a valid email address');
      return;
    }

    try {
      setErrors('');
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/referral/affiliate-forgotpassword`, {
        email: email.trim()

      })
      console.log('Response:', response.data);
      setIsLoading(false);
      setSent(true);
    } catch (error) {
      console.error('Error sending reset link:', error);
      setErrors('Failed to send reset link. Please try again later.');
      setIsLoading(false);
      return;
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
                  <Lock sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  Forgot Password
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Enter your email to receive a reset link
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {sent ? (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Password reset link sent to <strong>{email}</strong>.
                    Please check your inbox.
                  </Alert>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!errors}
                      helperText={errors}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSend}
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
                          Sending...
                        </Box>
                      ) : (
                        <>
                          <Send sx={{ mr: 1 }} />
                          Send Reset Link
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
