import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

 function ResetPassword() {
    const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0: request reset, 1: enter new password, 2: success
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    resetCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, type: '', message: '' });

  const steps = ['Enter Email', 'Reset Password', 'Complete'];

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const showAlertMessage = (type, message) => {
    setShowAlert({ show: true, type, message });
    setTimeout(() => setShowAlert({ show: false, type: '', message: '' }), 4000);
  };

  const validateEmailForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!formData.resetCode) {
      newErrors.resetCode = 'Reset code is required';
    } else if (formData.resetCode.length !== 6) {
      newErrors.resetCode = 'Reset code must be 6 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmailForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(1);
      showAlertMessage('success', 'Reset code sent to your email!');
    }, 1500);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    navigate("/login");
  };

  const handleBackToEmail = () => {
    setCurrentStep(0);
    setErrors({});
  };

  const renderEmailForm = () => (
    <Box component="form" onSubmit={handleEmailSubmit} noValidate>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email || 'We\'ll send a reset code to this email address'}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{
          py: 1.5,
          mb: 3,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
          },
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600
        }}
      >
        {isLoading ? 'Sending...' : 'Send Reset Code'}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToLogin}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );

  const renderPasswordForm = () => (
    <Box component="form" onSubmit={handlePasswordSubmit} noValidate>
      <TextField
        fullWidth
        id="resetCode"
        name="resetCode"
        label="Reset Code"
        type="text"
        autoComplete="off"
        autoFocus
        value={formData.resetCode}
        onChange={handleInputChange}
        error={!!errors.resetCode}
        helperText={errors.resetCode || 'Enter the 6-digit code sent to your email'}
        sx={{ mb: 2 }}
        inputProps={{ maxLength: 6 }}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{
          py: 1.5,
          mb: 3,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
          },
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600
        }}
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToEmail}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          Back to Email
        </Button>
      </Box>
    </Box>
  );

  const renderSuccessForm = () => (
    <Box sx={{ textAlign: 'center' }}>
      <CheckCircle 
        sx={{ 
          fontSize: 80, 
          color: 'success.main', 
          mb: 2 
        }} 
      />
      <Typography variant="h6" gutterBottom>
        Password Reset Successfully!
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Your password has been updated. You can now sign in with your new password.
      </Typography>
      
      <Button
        fullWidth
        variant="contained"
        onClick={handleBackToLogin}
        sx={{
          py: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
          },
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600
        }}
      >
        Go to Login
      </Button>
    </Box>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderEmailForm();
      case 1:
        return renderPasswordForm();
      case 2:
        return renderSuccessForm();
      default:
        return renderEmailForm();
    }
  };

  const getPageTitle = () => {
    switch (currentStep) {
      case 0:
        return 'Reset Password';
      case 1:
        return 'Create New Password';
      case 2:
        return 'All Set!';
      default:
        return 'Reset Password';
    }
  };

  const getPageSubtitle = () => {
    switch (currentStep) {
      case 0:
        return 'Enter your email address and we\'ll send you a reset code';
      case 1:
        return 'Enter the code and create your new password';
      case 2:
        return 'Your password has been successfully reset';
      default:
        return 'Enter your email address and we\'ll send you a reset code';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {getPageTitle()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {getPageSubtitle()}
            </Typography>
          </Box>

          {currentStep < 2 && (
            <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          <Fade in={showAlert.show}>
            <Alert 
              severity={showAlert.type} 
              sx={{ mb: 2, display: showAlert.show ? 'flex' : 'none' }}
            >
              {showAlert.message}
            </Alert>
          </Fade>

          {getStepContent()}
        </Paper>
      </Container>
    </Box>
  );
}
export default ResetPassword;