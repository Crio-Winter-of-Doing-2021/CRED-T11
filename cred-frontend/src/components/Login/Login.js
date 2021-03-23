import React, { useEffect, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const authContext = useContext(AuthContext);
  const [redirect, setredirect] = useState("/dashboard");
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/signin", data);
      const userResponse = {
        token: res.data.data.accessToken,
      };

      authContext.login(userResponse.token);
    } catch (err) {
      console.log(err);
    }
    // axios.post('api/auth/login',data)
    console.log(data);
  };
  useEffect(() => {
    console.log(authContext.isLoggedIn);
  });
  // if (authContext.isLoggedIn) {
  //   return <Redirect to={redirect} />;
  // }

  return (
    <>
      {true && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              WELCOME TO CRED
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                fullWidth
                autoFocus
                control={control}
                defaultValue=""
              />
              <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                id="password"
                label="Password"
                name="password"
                fullWidth
                control={control}
                defaultValue=""
              />
              {errors.password && <span>This field is required</span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
    height: 80,
    width: 80,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
