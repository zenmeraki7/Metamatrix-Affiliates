import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Alert,
  Fade,
  CircularProgress,
  Link
} from '@mui/material';
import {
  Check,
  Error,
  MailOutline,
  Send
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  },
});

export default function VerifyEmailPage() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0); // 0: pending, 1: verifying, 2: success, 3: failed
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Check for email verification token on component mount
 useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
    setCurrentStep(1);
    verifyEmail(token); // Pass it to function
  } else {
    setCurrentStep(0);
  }
}, []);

 const verifyEmail = async (token) => {
  setIsLoading(true);
  try {
    const response = await fetch(`http://localhost:58307/referral/affiliate-userverify?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), 
    });

    const data = await response.json();
    setIsLoading(false);

    if (response.ok) {
      setCurrentStep(2);
      setUserEmail(data?.data?.user?.email || userEmail); 
    } else {
      setCurrentStep(3);
    }
  } catch (error) {
    setIsLoading(false);
    setCurrentStep(3);
  }
};



  const handleResendVerification = () => {
    setIsLoading(true);
    
    // Simulate resend verification email
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(0); // Back to pending state
    }, 2000);
    
    // In production, implement actual resend logic
  };

  const handleTryAgain = () => {
    setCurrentStep(0);
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
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
              <CardContent sx={{ p: 6 }}>
                {/* Step 0: Pending Verification */}
                {currentStep === 0 && (
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
                    
                    <Typography variant="h4" gutterBottom>
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Check Your Email
                      </Box>
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {userEmail ? (
                        <>We've sent a verification link to <strong>{userEmail}</strong></>
                      ) : (
                        'We\'ve sent a verification link to your email address'
                      )}
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
                      <Typography variant="body2">
                        <strong>Next steps:</strong><br />
                        1. Check your email inbox (and spam folder)<br />
                        2. Click the verification link in the email<br />
                        3. Your account will be activated automatically
                      </Typography>
                    </Alert>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Didn't receive the email?
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      startIcon={<Send />}
                      onClick={handleResendVerification}
                      disabled={isLoading}
                      sx={{ mb: 2 }}
                    >
                      {isLoading ? 'Sending...' : 'Resend Verification Email'}
                    </Button>
                    
                 
                  </Box>
                )}

                {/* Step 1: Verifying */}
                {currentStep === 1 && (
                  <Box textAlign="center">
                    <CircularProgress size={80} sx={{ mb: 4 }} />
                    
                    <Typography variant="h4" gutterBottom>
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Verifying Email
                      </Box>
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Please wait while we verify your email address...
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      This may take a few moments
                    </Typography>
                  </Box>
                )}

                {/* Step 2: Success */}
                {currentStep === 2 && (
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'success.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': {
                            transform: 'scale(1)',
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
                          },
                          '70%': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
                          },
                          '100%': {
                            transform: 'scale(1)',
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                          },
                        },
                      }}
                    >
                      <Check sx={{ fontSize: 50, color: 'white' }} />
                    </Box>
                    
                    <Typography variant="h4" gutterBottom color="success.main">
                      Email Verified Successfully!
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {userEmail ? (
                        <>Your email <strong>{userEmail}</strong> has been verified successfully.</>
                      ) : (
                        'Your email has been verified successfully.'
                      )}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Your account is now active and you can start using our platform.
                    </Typography>
                    
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                        },
                      }}
                      onClick={() => {
                        // Navigate to login or dashboard
                        window.location.href = '/login';
                      }}
                    >
                      Continue to Sign In
                    </Button>
                  </Box>
                )}

                {/* Step 3: Failed */}
                {currentStep === 3 && (
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'error.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                      }}
                    >
                      <Error sx={{ fontSize: 50, color: 'white' }} />
                    </Box>
                    
                    <Typography variant="h4" gutterBottom color="error.main">
                      Verification Failed
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      The verification link is invalid, expired, or has already been used.
                    </Typography>
                    
                    <Alert severity="warning" sx={{ mb: 4, textAlign: 'left' }}>
                      <Typography variant="body2">
                        <strong>Possible reasons:</strong><br />
                        • The link has expired (links are valid for 24 hours)<br />
                        • The link has already been used<br />
                        • The link is malformed or corrupted
                      </Typography>
                    </Alert>
                    
                    <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
                      <Button
                        variant="outlined"
                        onClick={handleTryAgain}
                        sx={{ px: 3 }}
                      >
                        Try Again
                      </Button>
                      
                      <Button
                        variant="contained"
                        startIcon={<Send />}
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        sx={{
                          px: 3,
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                          },
                        }}
                      >
                        {isLoading ? 'Sending...' : 'Resend Verification'}
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Footer */}
                <Box textAlign="center" mt={6}>
                  <Typography variant="body2" color="text.secondary">
                    Need help?{' '}
                    <Link href="/support" color="primary" sx={{ fontWeight: 600 }}>
                      Contact Support
                    </Link>
                    {' | '}
                    <Link href="/login" color="primary" sx={{ fontWeight: 600 }}>
                      Back to Sign In
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