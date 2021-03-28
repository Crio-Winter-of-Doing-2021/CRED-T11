import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router";
import animationData from "../../assests/success.json";

export default function SuccessPage() {
  const classes = useStyles();
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className={classes.animation}>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className={classes.message}>
        <h2>Paid Succesfully</h2>
        <Button onClick={()=>history.push('/dashboard')} variant="outlined" color="secondary">
            Go Back to Home Page
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  animation: {
    margin: "100px 0px",
  },
  message: {
      textAlign: 'center'
  }
}));
