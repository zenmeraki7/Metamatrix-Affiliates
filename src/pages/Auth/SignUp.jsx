import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  OutlinedInput,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  Collapse,
  Chip,
  Paper,
  Fade,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  LocationOn,
  Lock,
  Check,
  Google,
  GitHub
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
   
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { title: 'Personal Info', icon: Person },
    { title: 'Contact Details', icon: Email },
    { title: 'Security', icon: Lock }
  ];

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    } else if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
    } else if (step === 2) {
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
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 2000);
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const CustomStepIcon = (props) => {
    const { active, completed, icon } = props;
    const Icon = steps[icon - 1]?.icon || Person;
    
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: completed ? 'success.main' : active ? 'primary.main' : 'grey.300',
          color: completed || active ? 'white' : 'grey.500',
          transition: 'all 0.3s ease',
        }}
      >
        {completed ? <Check /> : <Icon />}
      </Box>
    );
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

                {/* Step Indicator */}
                <Box mb={4}>
                  <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel StepIconComponent={CustomStepIcon}>
                          <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {step.title}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

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

                {/* Form Steps */}
                <Box>
                  {/* Step 1: Personal Information */}
                  {currentStep === 0 && (
                    <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 1 && (
                    <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
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
                      
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      
                    </Box>
                  )}

                  {/* Step 3: Security */}
                  {currentStep === 2 && (
                    <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
                      <FormControl fullWidth variant="outlined" error={!!errors.password}>
                        <InputLabel>Password</InputLabel>
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
                          label="Password"
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
                      
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleInputChange}
                              color="primary"
                            />
                          }
                          label={
                            <Typography variant="body2">
                              I agree to the{' '}
                              <Link href="#" color="primary">
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link href="#" color="primary">
                                Privacy Policy
                              </Link>
                            </Typography>
                          }
                        />
                        {errors.agreeToTerms && (
                          <FormHelperText error sx={{ ml: 4 }}>
                            {errors.agreeToTerms}
                          </FormHelperText>
                        )}
                        
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="subscribeNewsletter"
                              checked={formData.subscribeNewsletter}
                              onChange={handleInputChange}
                              color="primary"
                            />
                          }
                          label={
                            <Typography variant="body2">
                              Subscribe to our newsletter
                            </Typography>
                          }
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Navigation Buttons */}
                  <Box display="flex" gap={2} mt={4}>
                    {currentStep > 0 && (
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{ flex: 1 }}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={isLoading}
                      sx={{
                        flex: 1,
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
                      ) : currentStep === steps.length - 1 ? 'Create Account' : 'Next'}
                    </Button>
                  </Box>
                </Box>

                {/* Social Sign Up - Only show on first step */}
                {currentStep === 0 && (
                  <>
                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Or sign up with
                      </Typography>
                    </Divider>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Google />}
                          onClick={() => handleSocialSignUp('Google')}
                          sx={{
                            borderColor: 'grey.300',
                            color: 'text.primary',
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: 'primary.50',
                            },
                          }}
                        >
                          Google
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<GitHub />}
                          onClick={() => handleSocialSignUp('GitHub')}
                          sx={{
                            borderColor: 'grey.300',
                            color: 'text.primary',
                            '&:hover': {
                              borderColor: 'grey.800',
                              backgroundColor: 'grey.50',
                            },
                          }}
                        >
                          GitHub
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}

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