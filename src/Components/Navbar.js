import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MoreIcon from '@material-ui/icons/MoreVert';
import { logoutUser, isLoggedIn } from '../services/auth';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'block',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

function Navbar({page}){

    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logUserOut = () => {
    logoutUser()
    window.location.assign('/')
  }

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="d-flex"
    >
        <div className="menu-desktop">
            <div>
              <NavLink to={'/profile'} style={{textDecoration: "none", color: "inherit"}}>
                <MenuItem onClick={handleMenuClose} className="w-100"> Profile</MenuItem>
              </NavLink>
            </div>
            <div>
              <NavLink to={'/changepassword'} style={{textDecoration: "none", color: "inherit"}}>
                <MenuItem onClick={handleMenuClose} className="w-100"> Change Password</MenuItem>
              </NavLink>
            </div>
          
            <div>
              <MenuItem onClick={logUserOut} className="w-100">Logout</MenuItem>
            </div>
        </div>
        <div className="menu-mobile">
          <NavLink to={'/home'} style={{textDecoration: "none", color: "inherit"}}>
            <MenuItem onClick={handleMenuClose}> Home</MenuItem>
          </NavLink>
          
          <NavLink to={'/contact'} style={{textDecoration: "none", color: "inherit"}}>
            <MenuItem onClick={handleMenuClose}> Contact</MenuItem>
          </NavLink>
          <NavLink to={'/about'} style={{textDecoration: "none", color: "inherit"}}>
            <MenuItem onClick={handleMenuClose}> About</MenuItem>
          </NavLink>
        </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <NavLink to={'/profile'} style={{textDecoration: "none", color: "inherit"}}>
      <MenuItem>
      <IconButton color="inherit" className="mb-3">
            <PersonIcon/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </NavLink>
      <MenuItem onClick={logUserOut}>
      <IconButton color="inherit" className="mb-3">
        <MeetingRoomIcon/>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );


    return(
        <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar className="navcontainer">
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <NavLink className="logobrand" to='/home'>
            <Typography className={classes.title} variant="h6" noWrap>
              <strong>DIG</strong>
            </Typography>
            </NavLink>
            <div className="menuitems">
            <ul>
              <li>
                <NavLink className="navlink pt-4" to={'/home'}
                  activeStyle={{
                    fontWeight: "bold",
                    backgroundColor: "#384897"
                  }}
                >
                  <strong>Home</strong>
                </NavLink>
              </li>
              <li>
                <NavLink className="navlink pt-4" to={'/contact'}
                  activeStyle={{
                    fontWeight: "bold",
                    backgroundColor: "#384897"
                  }}
                >
                  <strong>Contact</strong>
                </NavLink>
              </li>
              <li>
                <NavLink className="navlink pt-4" to={'/about'}
                  activeStyle={{
                    fontWeight: "bold",
                    backgroundColor: "#384897"
                  }}
                >
                  <strong>About</strong>
                </NavLink>
              </li>
            </ul>
            </div>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {page}
      </div>
    )
}
export default Navbar