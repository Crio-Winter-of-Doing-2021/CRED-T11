import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setAxiosAuthToken } from "../../utils/Utils";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { makeStyles, Button, Card, Box } from "@material-ui/core";

export default function Pay() {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  let { cardId } = useParams();
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState({});

  let history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    setOpen(false);
    setAxiosAuthToken();
    axios
      .post(`api/card/${cardId}/pay`, data)
      .then((response) => {
        history.push("/success");
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div>
      <Box className={classes.payData} boxShadow={3}>
        <h3>Payment/Card Info</h3>
        <p>Card no. - {card?.card_no} </p>
        <p>Card Name - {card?.card_name} </p>
        <p>Out Standing Amount - {card?.outstanding_amount} </p>
      </Box>
      {+card?.outstanding_amount ? (
        <form className={classes.form}>
          <span>Select amount</span>
          <TextField
            id="amount"
            label="amount"
            name="amount"
            variant="outlined"
            margin="normal"
            ref={null}
            inputRef={register}
            defaultValue={card?.outstanding_amount}
            required
          />
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            Submit
          </Button>
        </form>
      ) : (
        <p style={{textAlign: 'center'}} >
          You are awesome user!
          <br/>
          you dont have any outstanding amount
        </p>
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
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 40,
  },
  payData: {
    margin: "30px 10px",
    padding: 10,
  },
}));
