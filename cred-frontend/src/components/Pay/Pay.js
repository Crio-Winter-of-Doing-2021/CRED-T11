import React from "react";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { makeStyles, Button } from "@material-ui/core";

export default function Pay() {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = async (data) => {
    // try {
    //   const res = await axios.post("api/auth/signin", data);
    //   const userResponse = {
    //     token: res.data.data.accessToken,
    //   };

    //   authContext.login(userResponse.token);
    // } catch (err) {
    //   console.log(err);
    // }
    // // axios.post('api/auth/login',data)
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
          margin="normal"
          type="number"
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
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 40,
  },
}));
