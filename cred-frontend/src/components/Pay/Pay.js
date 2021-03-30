import React from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setAxiosAuthToken } from "../../utils/Utils";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import { makeStyles, Button, Card, Box } from "@material-ui/core";

export default function Pay() {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  let { cardId, year, month, amount } = useParams();
  const [open, setOpen] = React.useState(false);

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
      .post(`api/card/${cardId}/pay/${year}/${month}`, data )
      .then((response) => {
        history.push('/success')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Box className={classes.payData} boxShadow={3}>
        <h3>Payment Info</h3>
        <p>Month/Year - {month+'/'+year} </p>
        <p>Out Standing Amount - ₹ {amount}</p>
      </Box>
      {/* <h3 className={classes.title}>Amount Pay</h3> */}
      <form className={classes.form}>
        <span>Select amount</span>
        <TextField
          id="amount"
          label="amount"
          name="amount"
          variant="outlined"
          type="number"
          margin="normal"
          type="number"
          inputRef={register}
          defaultValue={amount}
          required
        />
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Submit
        </Button>
      </form>
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
