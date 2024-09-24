import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState, useAppDispatch } from "../../store";
import { getEmailFromToken } from "../../utils/jwt";
import { getProfile, logoutUser } from "../../store/auth/actionCreators";
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

// Импортируем компонент LogoutDialog
import LogoutDialog from "../dialog/logoutDialog/logoutDialog";

// Все страницы
const allPages = [
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'Workers', path: '/workers' },
  { name: 'Companies', path: '/companies' }
];

const settings = ['Profile', 'Logout'];

function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  const email = dispatch(getEmailFromToken);

  useEffect(() => {
    if (email) {
      dispatch(getProfile(email));
    }
  }, [email, dispatch]);

  const profile = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );

  const role = profile?.role; // Получаем роль пользователя

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Состояние для управления диалоговым окном
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    setAnchorElUser(null);
    setOpenLogoutDialog(true); // Открываем диалоговое окно при нажатии на Logout
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false); // Закрываем диалоговое окно
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false); // Закрываем диалоговое окно после подтверждения
    dispatch(logoutUser());
  };

  // Определяем, какие вкладки показывать на основе роли
  const getFilteredPages = () => {
    if (role === "ROLE_ADMIN") {
      return allPages; // Админ видит все вкладки
    } else if (role === "ROLE_MANAGER") {
      return allPages.filter(page => page.name !== 'Companies'); // Менеджер не видит Companies
    } else {
      return allPages.filter(page => page.name !== 'Companies' && page.name !== 'Workers'); // Пользователь не видит Companies и Workers
    }
  };

  const filteredPages = getFilteredPages();

  return (
    <div>
      {isLoggedIn ?
        <AppBar position="static" sx={{ bgcolor: 'white' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none'
                }}
              >
                EQUIP
              </Typography>

              {/* Мобильное меню */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
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
                >
                  {filteredPages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                      <Box
                        component={Link}
                        to={page.path}
                        sx={{ textDecoration: 'none', color: 'black', width: '100%', display: 'block' }}
                      >
                        <Typography textAlign="left">{page.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Десктопное меню */}
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none'
                }}
              >
                EQUIP
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {filteredPages.map((page) => (
                  <Box
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block', textDecoration: 'none', px: 2 }}
                  >
                    {page.name.toUpperCase()}
                  </Box>
                ))}
              </Box>

              {/* Профиль пользователя */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Eq" src="/static/images/avatar/2.jpg" />
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
                    <MenuItem
                      key={setting}
                      onClick={setting === 'Logout' ? handleLogoutClick : handleCloseUserMenu}
                    >
                      <Typography textAlign="center">
                        {setting === 'Logout' ? (
                          setting
                        ) : (
                          <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {setting}
                          </Link>
                        )}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        :
        <></>
      }

      {/* Используем компонент LogoutDialog */}
      <LogoutDialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default Header;
