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
import MonoviLogo from '../image/monovi-logo.png';
import Photo from '../OtherComponents/Photo';


const pages = ['Home', 'Authors', 'About', 'Contact'];
const settings = ['Profile', 'My-Books', 'Friends'];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [photoUrl,setPhotoUrl] = useState(null);
  const [name,setName] = useState("");
  const {setUserId,userId} = props;
  useEffect(() => 
  { 
    console.log(userId);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/"+userId).
    then((res) =>
      res.json()).
    then((result) => {
      setName(result.firstName);
      if(result.profil !=null ){
        setPhotoUrl(Photo(result.profil.content, result.profil.name));
      }
    },
    (error) => {
      console.log(error);
    });
  }, [userId]);

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
  const handleLogout = () =>{
    handleCloseUserMenu();
    localStorage.removeItem("userId");
    setUserId(null);
    navigate('/');
  }

  return (
    <AppBar position="static" sx={{height:{xs:"80px",md:"100px"}, backgroundColor:"#AFEDFF"}}>
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
                  navigate("/"+page.toLowerCase())}}>
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
                onClick={()=>navigate("/"+page.toLowerCase())}
                sx={{mr:2,my: 2, color: "white", display: 'block',fontSize:"16px",fontFamily:"Verdana",fontWeight:"bold" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photoUrl} />
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
                <MenuItem key={setting} onClick={()=>{
                  handleCloseUserMenu();
                  navigate("/"+setting.toLowerCase())}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;