import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";
import classes from "./Login.module.css";

export default function LogIn() {
  const authContext = useContext(AuthContext);
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/signin", data);
      console.log(res);
      const { email, username } = res.data.data.user;
      const userResponse = {
        token: res.data.data.accessToken,
        user: {
          email: email,
          username: username,
        },
      };
      alertify.success(res.data.metadata.message);
      authContext.login(userResponse.token, userResponse.user);
    } catch (err) {
      alertify.error(err.response.data.metadata.message);
    }
    console.log(data);
  };
  useEffect(() => {
    console.log(authContext.isLoggedIn);
  });
  if (authContext.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      {!authContext.isLoggedIn && (
        <div className={classes.root}>
          <h3 className={classes.title}>WELCOME TO CRED</h3>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              required
              type="username"
              className={classes.TextField}
              id="username"
              label="Username"
              placeholder="Enter your Username"
              name="username"
              ref={register}
            />
            <input
              variant="outlined"
              margin="normal"
              required
              className={classes.TextField}
              type="password"
              placeholder="Enter your Password"
              id="password"
              label="Password"
              name="password"
              ref={register}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
