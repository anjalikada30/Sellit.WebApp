import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Alert, Snackbar, Tab, Tabs } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import { SellProduct } from '../sell-product';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth';

const pages = [
  {
    label: "Home",
    route: "/home"
  },
  {
    label: "All Bids",
    route: "/all-bids"
  },
  // {
  //   label: "Bookmarks",
  //   route: "/bookmarks"
  // }
];
const settings = [
  {
    label: "Profile",
    route: "/user-profile"
  },
  {
    label: "Dashboard",
    route: "/home"
  },
  {
    label: "Logout",
    route: "/"
  }
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [openSellModal, setOpenSellModal] = React.useState(false)
  const [snackDetails, setSnackDetails] = React.useState({})
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (label) => {
    setAnchorElUser(null);
    if (label === 'Logout') {
      dispatch(logout())
    }
  };
  const handleSellModalClose = (message) => {
    setOpenSellModal(false)
    if (message === 'success') {
      setSnackDetails({
        show: true,
        severity: 'success',
        message: "Product added successfully!"
      })
    }
  }
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackDetails({});
  };
  return (
    <>
      <AppBar position="static" sx={{ background: "white" }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
              isLoggedIn ?
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    style={{ color: "black" }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                    style={{ color: "black" }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box> : null
            }
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="sell-it"
              src={logo}
            />
            {
              isLoggedIn ?
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Tabs sx={{ marginLeft: "25vw", color: "black" }}
                      indicatorColor="secondary"
                      textColor="inherit"
                      value={value}
                      onChange={(e, value) => setValue(value)}>
                      {pages.map((page) => (
                        <Tab key={page.label} label={page.label} index={0} component={Link} to={page.route} />
                      ))}
                    </Tabs>
                  </Box>
                  <Button variant="contained" startIcon={<AddIcon />} sx={{ margin: 2 }} onClick={() => setOpenSellModal(true)}>
                    Sell
                  </Button>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: 2 }}>
                    <NotificationsNoneIcon sx={{ fontSize: 25 }} />
                  </IconButton>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: 2 }}>
                        <AccountCircleIcon sx={{ fontSize: 35 }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting.label} onClick={() => handleCloseUserMenu(setting.label)} link>
                          <Typography textAlign="center" component={Link} to={setting.route}
                            sx={{ color: 'inherit', textDecoration: 'none' }} >
                            {setting.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </> : null
            }
          </Toolbar>
        </Container>
      </AppBar>
      {
        openSellModal ?
          <SellProduct handleClose={handleSellModalClose} />
          : null
      }
      <Snackbar open={snackDetails.show}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity={snackDetails.severity}
          sx={{ width: '100%' }}>
          {snackDetails.message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Header;
