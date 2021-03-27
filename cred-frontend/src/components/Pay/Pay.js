import React from "react";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setAxiosAuthToken } from "../../utils/Utils";
import axios from "axios";
import { makeStyles, Button } from "@material-ui/core";

export default function Pay() {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  let { cardId } = useParams();

  const onSubmit = async (data) => {
    // console.log(typeof(data))
    setAxiosAuthToken();
    axios
      .post(`api/card/${cardId}/pay`, data )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  return (
    <div>
      <h3 className={classes.title}>Amount Pay</h3>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="amount"
          label="amount"
          name="amount"
          variant="outlined"
          type="number"
          margin="normal"
          type="number"
          inputRef={register}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
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
}));
