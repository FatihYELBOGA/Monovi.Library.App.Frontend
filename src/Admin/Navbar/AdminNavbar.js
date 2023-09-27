import {useEffect,useState} from 'react';
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
import { useNavigate } from 'react-router-dom';
import MonoviLogo from '../../image/monovi-logo.png';
import Photo from '../../OtherComponents/Photo';


const pages = ['Users', 'Authors', 'Books'];


function AdminNavbar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
 
  const {setUserId,userId} = props;
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () =>{
    handleCloseUserMenu();
    localStorage.removeItem("userId");
    localStorage.removeItem("jwtToken");
    setUserId(null);
    navigate('/');
  }

  return (
    <AppBar position="static" sx={{height:{xs:"80px",md:"100px",backgroundColor:"#333"}}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{marginTop:"10px"}}>
        
       
          <Avatar
            sx={{  height: "12%",
            width: '15%',
            marginRight: 20,
            display: { xs: 'none', md: 'flex' } }}
            src={MonoviLogo}
            alt="Logo"
          />


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{
                  handleCloseNavMenu();
                  navigate("/admin-"+page.toLowerCase())}}>
                  <Typography sx={{fontSize:"18px !important"}} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          
            <Avatar
            sx={{  height: "20%",
            width: '20%',
            mr:"40%",
            display: { xs: 'flex', md: 'none' } }}
            src={MonoviLogo}
            alt="Logo"
          />
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>navigate("/admin-"+page.toLowerCase())}
                sx={{mr:2,my: 2, color: "white", display: 'block',fontSize:"16px",fontFamily:"Verdana",fontWeight:"bold" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNavbar;