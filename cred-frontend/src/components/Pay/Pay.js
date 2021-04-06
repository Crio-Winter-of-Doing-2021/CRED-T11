import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setAxiosAuthToken } from "../../utils/Utils";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import { Button } from "@material-ui/core";
import SuccessPage from "../SuccessPage/SuccessPage";
import BottomBar from "../BottomBar/BottomBar";
import classes from "./Pay.module.css";
import Lottie from "react-lottie";
import alertify from "alertifyjs";
import animationData from "../../assests/party.json";

export default function Pay() {
  const { handleSubmit, register } = useForm();
  let { cardId } = useParams();
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState({});
  const [paid, setPaid] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (data.amount > card?.outstanding_amount) {
      alertify.error("Enter valid amount");
    } else {
      setOpen(false);
      setAmount(data.amount)
      setAxiosAuthToken();
      axios
        .post(`api/card/${cardId}/pay`, data)
        .then((response) => {
          setPaid(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };

  useEffect(() => {
    axios
      .get(`api/viewcard/${cardId}`, setAxiosAuthToken())
      .then((response) => {
        console.log(response.data.data);
        setCard(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      {!paid && (
        <div className={classes.payData}>
          <h3 className={classes.title}>Payment/Card Info</h3>
          <p className={classes.text}>Card no. - {card?.card_no} </p>
          <p className={classes.text}> Card Name - {card?.card_name} </p>
          <p className={classes.text}>
            Out Standing Amount - {card?.outstanding_amount || "0"}
          </p>
        </div>
      )}
      {!paid ? (
        +card?.outstanding_amount ? (
          <form className={classes.form}>
            <span className={classes.text}>Select amount*</span>
            <input
              id="amount"
              label="amount"
              className={classes.TextField}
              name="amount"
              ref={register}
              defaultValue={card?.outstanding_amount}
              required
            />
            <div className={classes.list}>
              <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Pay Amount
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <Lottie options={defaultOptions} height={200} width={200} />
            <p style={{ textAlign: "center" }} className={classes.text}>
              You are awesome user!
              <br />
              you dont have any outstanding amount
            </p>
          </div>
        )
      ) : (
        <SuccessPage amount={amount} />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Confirm Your Pay Amount
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
      <BottomBar />
    </div>
  );
}
