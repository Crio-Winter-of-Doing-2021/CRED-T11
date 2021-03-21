import React,{useContext,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import {AuthContext} from '../../context';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [status,setStatus]=useState();
  const authContext = useContext(AuthContext);

  const onSubmit = async (data) => {
    try{
    const res =await axios.post('api/auth/signup',data)
    setStatus(res.status);
    console.log(res)
    // return <Redirect to='/login'/>
    
    }catch(err){
      console.log({err})
      console.log(err.response.data.metadata.message)
    }
  }
  if(status){
    return <Redirect to='/login'/>
  }
  if(authContext.isLoggedIn){
    return <Redirect to='/dashboard' />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller as={TextField} variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            fullWidth
            autoFocus control={control} defaultValue="" />
          <Controller as={TextField} variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            fullWidth
            autoFocus control={control} defaultValue="" />
          <Controller as={TextField} variant="outlined"
            margin="normal"
            required
            id="password"
            label="Password"
            name="password"
            fullWidth
            control={control} defaultValue="" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item >
              <Link to="/login" >
                {"Already have an account ? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}