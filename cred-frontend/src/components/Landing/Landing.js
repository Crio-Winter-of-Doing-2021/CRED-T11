import { Box, Button, Card } from "@material-ui/core";
import React, { useState } from "react";
import LogIn from "../Login/Login";
import SignUp from "../Signup/Signup";
import classes from "./Landing.module.css";
import credLogo from "../../assests/circle_logo.png";

export default function Landing() {
  const [isLoginOption, setisLoginOption] = useState(false);
  const handleOption = (value) => {
    setisLoginOption(value);
  };

  const onSuccess = () => {
    setisLoginOption(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleData}>
        <img src={credLogo} className={classes.logo} />
        <div className={classes.title}>
          <p>
            CREDIT CARD
            <br />
            MANAGEMENT SYSTEM
          </p>
        </div>
      </div>
      <div>
        <Button
          className={classes.button}
          onClick={() => handleOption(true)}
          variant="outlined"
          color="secondary"
        >
          Log in
        </Button>
        <Button
          className={classes.button}
          onClick={() => handleOption(false)}
          variant="outlined"
          color="primary"
        >
          Sign Up
        </Button>
      </div>
      <div className={classes.regCard}>
        {isLoginOption ? <LogIn /> : <SignUp onSuccess={onSuccess} />}
      </div>
    </div>
  );
}
