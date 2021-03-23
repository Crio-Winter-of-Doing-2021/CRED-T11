import { Box, Button, Card, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import LogIn from "../Login/Login";
import SignIn from "../Signup/Signup";

export default function Landing() {
  const classes = useStyles();
  const [isLoginOption, setisLoginOption] = useState(false);
  const handleOption = (value) => {
    setisLoginOption(value); 
  }
  return (
    <div className={classes.root}>
      <Box boxShadow={3} className={classes.box}>
        <Card className={classes.card}>
          <span className={classes.title}>CRED BANNER</span>
          <p className={classes.para}>
          Credit card management is to make payment of bills and keeping track of transactions easy for the consumers, across multiple credit cards.
          </p>
        </Card>
      </Box>
      <div className={classes.box}>
        <Button className={classes.button} onClick={()=>handleOption(true)} variant="outlined" color="secondary">
          Log in
        </Button>
        <Button className={classes.button} onClick={()=>handleOption(false)} variant="outlined" color="primary">
          Sign Up
        </Button>
      </div>
      <div className={classes.regCard} >{isLoginOption ? <LogIn /> : <SignIn />}</div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'black',
  },
  box: {
    margin: 10,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 10px",
  },
  title: {
    fontSize: 20,
  },
  para: {
    textAlign: "justify",
  },
  button: {
    margin: "10px 10px 20px 0px",
  },
  regCard: {
      backgroundColor: 'aliceblue'
  }
}));
