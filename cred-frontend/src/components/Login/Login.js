import React, { useEffect, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const authContext = useContext(AuthContext);
  const [redirect, setredirect] = useState("/dashboard");
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/signin", data);
      console.log(res)
      const {email,username}=res.data.data.user;
      const userResponse = {
        token: res.data.data.accessToken,
        user:{
          email:email,
          username:username,
        },
      };

      authContext.login(userResponse.token, userResponse.user);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
  useEffect(() => {
    console.log(authContext.isLoggedIn);
  });
  if (authContext.isLoggedIn) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      { !authContext.isLoggedIn && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              WELCOME TO CRED
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="username"
                id="username"
                label="Username"
                name="username"
                inputRef={register}
                fullWidth
                defaultValue=""
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="password"
                id="password"
                label="Password"
                name="password"
                inputRef={register}
                fullWidth
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
