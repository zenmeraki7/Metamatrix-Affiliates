import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  Avatar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook,
  GitHub,

} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { BASE_URL } from '../../utils/baseUrl';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/referral/affiliate-userlogin`, {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('affiliateToken', response.data.token);
      localStorage.setItem('affiliateUser', JSON.stringify(response.data.user));

      // Optional: Redirect to dashboard
      window.location.href = '/dashboard';

      console.log('Login successful:', response);
    }
    catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      setErrors({ general: error.response?.data?.message || 'Login failed. Please try again.' });
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
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

            <Typography variant="body1" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          <Fade in={showSuccess}>
            <Alert
              severity="success"
              sx={{ mb: 2, display: showSuccess ? 'flex' : 'none' }}
            >
              Login successful! Welcome back.
            </Alert>
          </Fade>

          <Box component="form" onSubmit={handleSubmit} noValidate >
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
              helperText={errors.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth variant="outlined" error={!!errors.password} sx={{ mt: 2 }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                sx={{ borderRadius: 2 }}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link href="/forgot-password" variant="body2" sx={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Box>

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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Or continue with
              </Typography>
            </Divider>

            {/* <Box sx={{ display: 'flex', gap: 2, mb: 3 }}> */}
            <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  mb: 3,

                }}
              >
                <GoogleLogin
                  width="1000px"
                  auto_select={false}
                  theme="outline"
                  // size="large"
                  shape="circle"
                  logo_alignment="left"
                  text="signin_with"
                  locale="en"
                  onSuccess={credentialResponse => {
                    fetch(`${BASE_URL}/referral/affiliate-usergooglelogin`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ token: credentialResponse.credential }),
                    })
                      .then(res => res.json())
                      .then(data => { navigate('/dashboard') })
                      .catch(err => {
                        console.error('Google login error:', err);
                        toast.error("Google Login Failed");
                      });
                  }}
                  onError={() => {
                    console.error('Login Failed');
                    toast.error("Google Login Failed");
                  }}
                />
              </Box>
            </GoogleOAuthProvider>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="/signup" variant="body2" sx={{ textDecoration: 'none', fontWeight: 600 }}>
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
export default Login;