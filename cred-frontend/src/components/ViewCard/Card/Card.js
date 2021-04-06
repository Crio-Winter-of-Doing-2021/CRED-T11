import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import classes from "./Card.module.css";

export default function Card(props) {
  const ref = useRef();
  const { handleSubmit, register } = useForm();
  const { cardName, cardNo, expiryDate, cardId } = props;
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = () => {
    handleClose();
    history.push(`pay/${cardId}`);
  };
  const onSubmit = (data) => {
    handleClose();
    history.push(`/statement/${cardId}/${data.year}/${data.month}`);
  };

  return (
    <div>
      <div className={classes.cardStyle}>
        <div className={classes.card}>
          <div className={classes.cardNumber}>
            <span className={classes.numberSection}>
              {cardNo.slice(0, 4) +
                " " +
                cardNo.slice(4, 8) +
                " " +
                cardNo.slice(8, 12) +
                " " +
                cardNo.slice(12)}
            </span>
          </div>
          <div className={classes.cardInfo}>
            <div className={classes.cardName}>
              <span>Card Holder</span>
              <p className={classes.p}>{cardName}</p>
            </div>
            <div className={classes.cardExpiry}>
              <span>Expires</span>
              <p className={classes.p}>{expiryDate.split("-").join("/")}</p>
            </div>
          </div>
        </div>
        <div className={classes.buttonGroup}>
          <Button
            className={classes.Button}
            onClick={handlePay}
            variant="outlined"
            color="primary"
          >
            pay
          </Button>
          <Button
            className={classes.Button}
            variant="outlined"
            onClick={handleClickOpen}
            color="primary"
          >
            view statement
          </Button>
        </div>

        <Dialog
          open={open}
          ref={ref}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select the YYYY/MM</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogContentText>
                Select the Year/Month for showing the statements
              </DialogContentText>
              <div className={classes.monthDialog}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  id="year"
                  label="Year"
                  name="year"
                  inputRef={register({ minLength: 4, maxLength: 4 })}
                  fullWidth
                  defaultValue=""
                />
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  id="month"
                  label="Month"
                  name="month"
                  inputRef={register}
                  fullWidth
                  defaultValue=""
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Select
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

