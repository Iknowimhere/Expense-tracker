import * as React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SavingsIcon from '@mui/icons-material/Savings';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let navigate = useNavigate();

  const pages = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Income', path: '/dashboard/income', icon: <SavingsIcon /> },
    {
      name: 'Transaction',
      path: '/dashboard/transaction',
      icon: <AccountBalanceWalletIcon />,
    },
    { name: 'Budget', path: '/dashboard/budget', icon: <PriceChangeIcon /> },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const NavLinkStyles = ({ isActive }) => ({
    color: 'white',
    textDecoration: isActive ? 'underline' : 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  });

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    {page.icon}
                    <Typography>{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <PriceChangeIcon fontSize='large' />
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
              }}
            >
              BUDGET TRACKER
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} style={NavLinkStyles}>
                {page.icon}
                {page.name}
              </NavLink>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user.username}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user.username}
                  src={user.photo}
                  sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid white',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <SettingsIcon />
                  <Typography>Settings</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <LogoutIcon />
                  <Typography>Logout</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
