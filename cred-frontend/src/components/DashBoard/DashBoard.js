import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  makeStyles,
  Box,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { Redirect, useHistory } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar";

export default function DashBoard() {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const user = authContext.user;
  const handleOption = (type) => {
    console.log(type);
    switch (type) {
      case "ADD":
        return history.push("/addcard");
      case "VIEW":
        return history.push("/viewCards");
    }
  };
  return (
    true && (
      <div className={classes.root}>
        <div className={classes.userData}>
          <Avatar className={classes.avatar}></Avatar>
          <div className={classes.title}>
            <p>
              {user.username}
              <br />
              {user.email}
            </p>
          </div>
        </div>
        <div className={classes.buttons}>
          <Box className={classes.box} boxShadow={5}>
            <h3>Referral offers</h3>
            <p>
              Cred Referral Offer - Install App & Get 2% Upto Rs.1000 Cashback
              on First Credit Card Bill Payment. Refer Friend & Earn Upto
              Rs.1000 cashback per referral. Earn the 10 cred gems by inviting
              people to cred.
            </p>
          </Box>
          <Box className={classes.box} boxShadow={5}>
            <h3>Program offers</h3>
            <p>
              Cred Referral Offer - Install App & Get 2% Upto Rs.1000 Cashback
              on First Credit Card Bill Payment. Refer Friend & Earn Upto
              Rs.1000 cashback per referral. Earn the 10 cred gems by inviting
              people to cred.
            </p>
          </Box>
          <Box className={classes.box} boxShadow={5}>
            <h3>Point offers</h3>
            <p>
              Cred Referral Offer - Install App & Get 2% Upto Rs.1000 Cashback
              on First Credit Card Bill Payment. Refer Friend & Earn Upto
              Rs.1000 cashback per referral. Earn the 10 cred gems by inviting
              people to cred.
            </p>
          </Box>
        </div>
        <BottomBar />
      </div>
    )
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
    height: 50,
    width: 50,
  },
  userData: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    lineHeight: 1.4,
  },
  title: {
    marginLeft: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 10,
  },
  button: {
    width: "50%",
    margin: "20px 10px",
  },
  box: {
    margin: "10px 0px",
    padding: 10,
    backgroundColor: "antiquewhite",
  },
}));
