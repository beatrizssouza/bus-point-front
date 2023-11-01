import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import'./appbar.css';

export default function AppBarComponent() {
  return (
    <div className="AppBar">
      <AppBar position="static" style={{background: '#141218'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{fontFamily: 'Quicksand'}}>
            Bus Point
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/login"
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
