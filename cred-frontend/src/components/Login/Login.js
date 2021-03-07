import React,{useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { login } from "./LoginActions.js";
import { useDispatch,useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();
  const user = useSelector(state => state.auth.user)
  const history=useHistory()
  useEffect(()=>{
    if(user.username!==undefined){
      history.push('/dashboard')
    }
  })
  const onSubmit = (data) => {
    dispatch(login(data, "/dashboard"))
    console.log(data);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
            id="password"
            label="Password"
            name="password"
            fullWidth
            control={control} defaultValue="" />
          {errors.password && <span>This field is required</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item >
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}