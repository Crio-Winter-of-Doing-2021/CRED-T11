import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../Login/LoginActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar:{
    background:'#fff',
    color:'black',
  },
  title: {
    flexGrow: 1,
  },
  username:{
    marginRight:'10px',
    color:'#000'
  }
}));

export default function DashBoard() {
  const classes = useStyles();
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(user)
  const Logout=()=>{
    dispatch(logout());
  }
  return (
    <div className={classes.root}>
      
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Article Manga
          </Typography>
          <Typography variant="h6" className={classes.username}>
            {user?.user.username}
          </Typography>
          <Button color="inherit" onClick={Logout}>Log Out</Button>
        </Toolbar>
      {/* <ArticleList/> */}
    </div>
  );
}