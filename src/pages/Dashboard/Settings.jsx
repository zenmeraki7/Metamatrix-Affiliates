import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Alert,
  Stack
} from '@mui/material';
import {
  Person,
  Save,
  Edit,
  Check,
  Settings as SettingsIcon,
  Lock,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { Phone } from 'lucide-react';

function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    dob:""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePasswordSave = () => {
    setIsEditingPassword(false);
    setShowPasswordSuccess(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setShowPasswordSuccess(false), 3000);
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3b82f6'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'white'
    },
    '& .MuiOutlinedInput-input': {
      color: 'white'
    },
    '& .MuiSelect-select': {
      color: 'white'
    }
  };

  return (
    <Box>
      <Container maxWidth="md"   sx={{ 
          px: { xs: 1, sm: 2 }, 
          mx: 'auto' 
        }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
              }}
            >
              <SettingsIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'black',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Settings
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(6, 6, 6, 0.7)',
              fontSize: '1.1rem',
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            Manage your profile information and payout preferences
          </Typography>
        </Box>

        {/* Success Alerts */}
        {showSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4,
              background: 'rgba(34, 197, 94, 0.1)',
              borderColor: 'rgba(34, 197, 94, 0.3)',
              color: '#22c55e'
            }}
          >
            Settings updated successfully!
          </Alert>
        )}

        {showPasswordSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4,
              background: 'rgba(34, 197, 94, 0.1)',
              borderColor: 'rgba(34, 197, 94, 0.3)',
              color: '#22c55e'
            }}
          >
            Password updated successfully!
          </Alert>
        )}

        {/* Vertical Stack with Even Gaps */}
        <Stack spacing={4}>
          {/* Profile Information */}
          <Box
           sx={{
    borderRadius: 3,
    p: '2px', // Thickness of border
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)',
    
   
  }}
          >
        <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
             
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Person sx={{ color: 'white', fontSize: 24 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: 'white' }}
                  >
                    Profile Information
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {isEditing ? <Check /> : <Edit />}
                </IconButton>
              </Box>

              <Stack spacing={3}>
  {/* Row 1: Name & Email */}
<Grid container spacing={3} sx={{ width: '100%' }}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Full Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        disabled={!isEditing}
        variant="outlined"
        sx={textFieldStyles}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Email Address"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={!isEditing}
        variant="outlined"
        sx={textFieldStyles}
      />
    </Grid>
  </Grid>

  {/* Row 2: Phone & DOB */}
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        disabled={!isEditing}
        variant="outlined"
        sx={textFieldStyles}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Date of Birth"
        type="date"
        value={formData.dob}
        onChange={(e) => handleInputChange('dob', e.target.value)}
        disabled={!isEditing}
        variant="outlined"
        sx={textFieldStyles}
        InputLabelProps={{
          shrink: true
        }}
      />
    </Grid>
  </Grid>
</Stack>

            </CardContent>
          </Card>
          
         

          {/* Reset Password */}
       
        <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Lock sx={{ color: 'white', fontSize: 24 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: 'white' }}
                  >
                    Reset Password
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  sx={{
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {isEditingPassword ? <Check /> : <Edit />}
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    disabled={!isEditingPassword}
                    variant="outlined"
                    sx={textFieldStyles}
                    InputProps={{
                      endAdornment: isEditingPassword && (
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          sx={{ color: 'black' }}
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    disabled={!isEditingPassword}
                    variant="outlined"
                    sx={textFieldStyles}
                    InputProps={{
                      endAdornment: isEditingPassword && (
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          sx={{ color: 'black' }}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Box>
         

          {/* Save Buttons */}
          {(isEditing || isEditingPassword) && (
            <Card
              sx={{
             background: 'transparent',
             border: 'none',
             boxShadow: 'none',
             p: 0
    }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                  {isEditing && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => setIsEditing(false)}
                      sx={{
                          background: 'linear-gradient(135deg,rgb(225, 46, 91),rgb(187, 15, 104))',
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            background: 'linear-gradient(135deg,rgb(219, 15, 80), #7c3aed)'
                          }
                        }}
                      >
                        Cancel 
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        sx={{
                          background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)'
                          }
                        }}
                      >
                        Save Profile
                      </Button>
                    </>
                  )}
                  
                  {isEditingPassword && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsEditingPassword(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                          
                      sx={{
                          background: 'linear-gradient(135deg,rgb(225, 46, 91),rgb(187, 15, 104))',
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            background: 'linear-gradient(135deg,rgb(219, 15, 80), #7c3aed)'
                          }
                        }}
                      >
                        Cancel 
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Lock />}
                        onClick={handlePasswordSave}
                        sx={{
                          background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)'
                          }
                        }}
                      >
                        Update Password
                      </Button>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Settings;