import Button from "@material-ui/core/Button";
import React from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

export default function AddCard() {
  const { handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className={classes.container}>

      <div className={classes.cardBox}>
        <h2 className={classes.heading}>Add Your Card</h2>
        <form>
          <ul className={classes.list}>
            <li>
              <label className={classes.label}>Card Holder Name</label>
              <input
                className={classes.input}
                id="name"
                type="text"
                minLength="1"
                maxLength="40"
                required
              />
            </li>
            <li>
              <label className={classes.label}>Card Number</label>
              <input
                className={classes.input}
                id="number"
                type="text"
                placeholder="**** **** **** ****"
                minLength="12"
                maxLength="19"
                required
              />
            </li>
            <div className={classes.expiryDate}>
              <div className={classes.box}>
                <label className={classes.label}>Expiry Month</label>
                <input
                  className={classes.smallinput}
                  label="Expiry Month"
                  id="expiryMonth"
                  type="text"
                  placeholder="MM"
                  minLength="2"
                  maxLength="2"
                  required
                />
              </div>
              <div className={classes.box}>
                <label className={classes.label}>Expiry Year</label>
                <input
                  className={classes.smallinput}
                  id="expiryYear"
                  type="text"
                  placeholder="YY"
                  minLength="2"
                  maxLength="4"
                  required
                />
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
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardBox: {
    flex: '1 0 auto',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    maxWidth: '300px',
    overflow: 'hidden',
    padding: '2em 2em',
    margin: '10px 10px',
    boxShadow: '2px 2px 8px 0px rgba(0,0,0,0.5)',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '4px',
    outline: 'none',
    border: '1px solid #ebecee',
    padding: '10px',
    margin: '10px 0'
  },
  box:{
    width:'50%',
  },
  label: {
    color: '#343a40',
    display:'block',
  },
  heading: {
    color: '#343a40',
    margin: '0',
    paddingTop: '.25em',
    borderBottom: '1px solid #aeaeae',
    paddingBottom: '.75em',
  },
  expiryDate:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    margin:'10px 0'
  },
  smallinput: {
    boxSizing: 'border-box',
    width: '50%',
    borderRadius: '4px',
    outline: 'none',
    border: '1px solid #ebecee',
    padding: '10px',
    margin: '10px 0'
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
}))
