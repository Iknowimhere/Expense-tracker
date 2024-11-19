import * as React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import SavingsIcon from "@mui/icons-material/Savings";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];
function NavBar({ user, setUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let navigate = useNavigate();
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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  let NavLinkStyles=({isActive})=>{
   return{
      color:"white",
      textDecoration:isActive? "underline":"none"
    }
  }


  return (
    <AppBar position="static" >
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
          <PriceChangeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} fontSize="large" />
          <Typography variant="subtitle">Budget Tracker</Typography>
          </Box>
          
          <Box sx={{display:"flex",gap:"20px"}}>
          <NavLink to="/dashboard/transaction" style={NavLinkStyles} >Transaction</NavLink>
          <NavLink to="/dashboard/budget" style={NavLinkStyles}>Budget</NavLink>
          </Box>
        
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography sx={{ textAlign: "center" }}>
                  {user.username.toUpperCase()}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={logout} endIcon={<LogoutIcon />}>
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
