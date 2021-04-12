import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context";
import alertify from "alertifyjs";
import classes from "./Signup.module.css";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";

export default function SignUp(props) {
  const { handleSubmit, register } = useForm();
  const authContext = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/signup", data);
      alertify.success(res.data.metadata.message);
      props.onSuccess();
    } catch (err) {
      alertify.error(err.response.data.metadata.message);
    }
  };
  if (authContext.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>JOIN CRED</h3>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          variant="outlined"
          margin="normal"
          required
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
          placeholder="Enter your Email"
          required
          id="email"
          className={classes.TextField}
          label="Email"
          name="email"
          ref={register}
        />
        <input
          variant="outlined"
          margin="normal"
          type="password"
          required
          id="password"
          className={classes.TextField}
          label="Password"
          name="password"
          placeholder="Enter your Password"
          ref={register}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
