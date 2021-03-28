import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


export default function Card(props) {
  const classes = useStyles();
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
        <div className={classes.buttonGroup} >
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
          <DialogTitle id="form-dialog-title">Select the YY/MM</DialogTitle>
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
                  inputRef={register({ minLength: 2, maxLength: 2 })}
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

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    fontFamily: '"Space Mono", monospace',
    textShadow: "0 1px 1px rgba(0, 0, 0, 0.3)",
    height: "200px",
    width: "320px",
    flex: "0 0 auto",
    margin: "40px 10px",
  },
  card: {
    height: "100%",
    borderRadius: "8px",
    boxShadow: "1px 1px #aaa3a3",
    background: "linear-gradient(45deg, #343a40, #666666, #343a40)",
    color: "#fff",
  },
  cardNumber: {
    position: "relative",
    top: "75px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    wordSpacing: "8px",
    letterSpacing: "2px",
    padding: "0 16px",
  },
  p: {
    marginTop: "8px",
    fontSize: "15px",
  },
  cardInfo: {
    display: "flex",
    flexDirection: " row",
    justifyContent: "space-between",
    letterSpacing: "1px",
    lineHeight: "18px",
    textTransform: "uppercase",
    position: "relative",
    top: "110px",
    padding: "0 15px",
  },
  Button: {
    margin: "10px 10px 10px 0px",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
  monthDialog: {
    display: "flex",
  },
  textField: {
    margin: 10,
  },
  buttonGroup: {
    direction: 'rtl',
  },
  cardName: {},
  cardExpiry: {},
}));
