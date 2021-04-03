import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setAxiosAuthToken } from "../../utils/Utils";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import BottomBar from "../BottomBar/BottomBar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function AddCard() {
  const { register, handleSubmit, errors } = useForm();
  const ref = useRef();
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [existCard, setExistCard] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatEmailSameLength = (emilString) => {
    var splitEmail = emilString.split("@");
    var domain = splitEmail[1];
    var name = splitEmail[0];
    return name
      .substring(0, 3)
      .concat(Array(name.length - 3).join("*"))
      .concat("@")
      .concat(domain);
  };

  const otpValidate = (data) => {
    existCard.code = data.otp;
    axios
      .post("/api/family/addcard", existCard)
      .then((response) => {
        console.log(response);
        history.push("/viewCards");
        alertify.success(`CARD ADD SUCCESSFULLY`);
      })
      .catch((err) => {
        alertify.error(err.response.data.metadata.message);
      });
  };

  const onSubmit = (data) => {
    const expiry_date = data.year + "-" + data.month;
    const { card_no, card_name } = data;
    const cardData = {
      card_no: card_no,
      card_name: card_name,
      expiry_date: expiry_date,
    };
    setAxiosAuthToken();
    axios
      .post("/api/addcard", cardData)
      .then((response) => {
        if (response?.data?.data?.cardId) {
          setExistCard(response.data.data);
          const email = formatEmailSameLength(response.data.data.email);
          alertify.error(`OTP sent on the ${email}`);
          setOpen(true);
        } else {
          history.push("/viewCards");
          alertify.success(`CARD ADD SUCCESSFULLY`);
        }
      })
      .catch((err) => {
        alertify.error(err.response.data.metadata.message);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardBox}>
        <h2 className={classes.heading}>Add Your Card</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={classes.list}>
            <li>
              <label className={classes.label}>Card Holder Name</label>
              <input
                className={classes.input}
                name="card_name"
                type="text"
                minLength="1"
                maxLength="40"
                ref={register}
                required
              />
            </li>
            <li>
              <label className={classes.label}>Card Number</label>
              <input
                className={classes.input}
                name="card_no"
                type="number"
                placeholder="**** **** **** ****"
                ref={register({ minLength: 16, maxLength: 16 })}
                required
              />
              {errors.card_no && (
                <p className={classes.p}>Card Number must be 16 digit</p>
              )}
            </li>
            <div className={classes.expiryDate}>
              <div className={classes.box}>
                <label className={classes.label}>Expiry Month</label>
                <input
                  className={classes.smallinput}
                  label="Expiry Month"
                  name="month"
                  type="text"
                  placeholder="MM"
                  ref={register({ min: 1, max: 12 })}
                  required
                />
                {errors.month && <p className={classes.p}>month 1-12</p>}
              </div>
              <div className={classes.box}>
                <label className={classes.label}>Expiry Year</label>
                <input
                  className={classes.smallinput}
                  name="year"
                  type="text"
                  placeholder="YY"
                  ref={register({ min: 21, minLength: 2, maxLength: 2 })}
                  required
                />
                {errors.year && <p className={classes.p}>not valid year</p>}
              </div>
            </div>
          </ul>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Card
          </Button>
        </form>
      </div>
      <Dialog
        open={open}
        ref={ref}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter OTP</DialogTitle>
        <form onSubmit={handleSubmit(otpValidate)}>
          <DialogContent>
            <DialogContentText>
              Please enter OTP which was sent on the email id of original user
              of card
            </DialogContentText>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              type="text"
              id="OTP"
              label="OTP"
              inputRef={register}
              name="otp"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  cardBox: {
    flex: "1 0 auto",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    maxWidth: "300px",
    overflow: "hidden",
    padding: "2em 2em",
    margin: "10px 10px",
    boxShadow: "2px 2px 8px 0px rgba(0,0,0,0.5)",
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    outline: "none",
    border: "1px solid #ebecee",
    padding: "10px",
    margin: "10px 0",
  },
  box: {
    width: "50%",
  },
  label: {
    color: "#343a40",
    display: "block",
  },
  heading: {
    color: "#343a40",
    margin: "0",
    paddingTop: ".25em",
    borderBottom: "1px solid #aeaeae",
    paddingBottom: ".75em",
  },
  expiryDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "10px 0",
  },
  smallinput: {
    boxSizing: "border-box",
    width: "50%",
    borderRadius: "4px",
    outline: "none",
    border: "1px solid #ebecee",
    padding: "10px",
    margin: "10px 0",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  p: {
    color: "red",
  },
}));
