import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from 'axios';

export default function SignUp(props) {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const [status, setStatus] = useState();
  const authContext = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('api/auth/signup', data)
      setStatus(res.status);
      alertify.success(res.data.metadata.message);
      props.onSuccess();

    } catch (err) {
      alertify.error(err.response.data.metadata.message);
    }
  }
  if (authContext.isLoggedIn) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          JOIN CRED
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            inputRef={register}
            fullWidth
            defaultValue="" />
          <TextField variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            inputRef={register}
            fullWidth
            defaultValue="" />
          <TextField variant="outlined"
            margin="normal"
            type="password"
            required
            id="password"
            label="Password"
            name="password"
            fullWidth
            inputRef={register}
            defaultValue="" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
    height: 80,
    width: 80,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));