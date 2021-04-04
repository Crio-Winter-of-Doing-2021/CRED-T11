import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Lottie from "react-lottie";
import animationData from "../../assests/paymentSucess.json";

export default function SuccessPage({ amount }) {
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
      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className={classes.message}>
        <h2>₹ {amount }</h2>
        <h2>Paid Succesfully</h2>
        <Button
          onClick={() => history.push("/dashboard")}
          variant="outlined"
          color="secondary"
        >
          Go Back to Home Page
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  message: {
    textAlign: "center",
    color: "white",
  },
}));
