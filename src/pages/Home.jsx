import React from 'react';
import { 
  Button, 
  Typography, 
  Box, 
  Container,
  Chip,
  Stack
} from '@mui/material';
import { 
  ArrowForward, 
  PlayArrow, 
  Star, 
  BarChart 
} from '@mui/icons-material';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #312e81 100%)'
      }}
    >
      
      {/* Animated Background Blur Elements */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          zIndex: 1
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '30%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            top: '60%',
            left: '60%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
      </Box>

{/* Floating Decorative Elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '16px',
          height: '16px',
          backgroundColor: '#60a5fa',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 3s ease-in-out infinite',
          zIndex: 2
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '8%',
          width: '20px',
          height: '20px',
          backgroundColor: '#c084fc',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 3s ease-in-out infinite',
          animationDelay: '1s',
          zIndex: 2
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          top: '45%',
          right: '5%',
          width: '12px',
          height: '12px',
          backgroundColor: '#fbbf24',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float 3s ease-in-out infinite',
          animationDelay: '2s',
          zIndex: 2
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '14px',
          height: '14px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'float 3s ease-in-out infinite',
          animationDelay: '0.5s',
          zIndex: 2
        }}
      />
   
     


      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Container maxWidth="xl">
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: { xs: 3, md: 4 },
              gap: 2
            }}
          >
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                sx={{
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                }}
              >
                <BarChart 
                  sx={{ 
                    fontSize: { xs: 26, md: 30 },
                    color: 'white'
                  }} 
                />
              </Box>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.4rem', md: '1.6rem' },
                  color: 'white',
                  letterSpacing: '-0.02em'
                }}
              >
                MetaMatrix Affiliate
              </Typography>
            </Box>
            
            {/* Sign In Button */}
           <Link to='/login'>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                textTransform: 'none',
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 500,
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 1.75 },
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              Sign In
            </Button>
           </Link>
          </Box>
        </Container>
      </Box>

      {/* Main Hero Content */}
      <Box 
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          py: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            
            
            {/* Main Heading */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem', lg: '6.5rem' },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: 'white',
                  mb: 1
                }}
              >
                Earn{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient 3s ease infinite'
                  }}
                >
                  100%
                </Box>
              </Typography>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem', lg: '6.5rem' },
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: 'white'
                }}
              >
                of Every Sale
              </Typography>
            </Box>
            
            {/* Subtitle */}
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
                maxWidth: '700px',
                mx: 'auto',
                mb: 6
              }}
            >
              Join thousands of creators earning serious money with our transparent affiliate program. 
              Get paid the{' '}
              <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>
                full amount
              </Box>
              {' '}of your referral's first subscription.
            </Typography>

            {/* CTA Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ 
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb, #8b5cf6)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 6,
                  py: 2,
                  minWidth: '250px',
                  height: '60px',
                  borderRadius: 3,
                  boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 25px 50px rgba(37, 99, 235, 0.4)'
                  }
                }}
              >
                Start Earning Today
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 5,
                  py: 2,
                  minWidth: '200px',
                  height: '60px',
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 30px rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* About Metamatrix Section */}
      <Box 
        sx={{
          position: 'relative',
          zIndex: 10,
          py: { xs: 8, md: 12 },
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: 'white',
                mb: 3,
                letterSpacing: '-0.02em'
              }}
            >
              About Metamatrix
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Metamatrix Bulk Editor is a powerful Shopify tool designed to simplify bulk product management 
              for merchants. We developed an intuitive and efficient platform that allows users to manage 
              large inventories effortlessly. Our team focused on creating a seamless user experience with 
              features that enable quick product listing, bulk editing, and advanced filtering.
            </Typography>
          </Box>

          {/* Key Features */}
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                color: 'white',
                mb: 4,
                textAlign: 'center'
              }}
            >
              Key Features
            </Typography>
            <Box 
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              {[
                'Bulk product import and export',
                'Mass price updates and edits',
                'Advanced filtering options for quick searches',
                'User-friendly interface for easy navigation',
                'Real-time updates and seamless Shopify integration',
                'Download Edit-logs for tracking changes',
              ].map((feature, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                      ✓
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* How It Works */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                color: 'white',
                mb: 2,
                textAlign: 'center'
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Metamatrix Bulk Editor simplifies bulk product management for Shopify merchants 
              with powerful listing, editing, and filtering tools.
            </Typography>

            <Box 
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                maxWidth: '900px',
                mx: 'auto'
              }}
            >
              {[
                {
                  title: 'Bulk Listing & Import',
                  description: 'Upload multiple products via CSV with automatic field mapping, saving time and effort.'
                },
                {
                  title: 'Mass Editing & Updates',
                  description: 'Modify titles, prices, tags, stock levels, and variants in bulk with a single click.'
                },
                {
                  title: 'Advanced Filtering & Sorting',
                  description: 'Quickly find and update products by category, price, stock status, vendor, or tags.'
                },
                {
                  title: 'Real-Time Sync with Shopify',
                  description: 'Instantly apply changes to your store, preventing duplicate entries and errors.'
                }
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5
                      }}
                    >
                      <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                        ✓
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        lineHeight: 1.3
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      ml: 5
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;