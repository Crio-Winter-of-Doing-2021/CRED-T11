import { Avatar, BottomNavigation, BottomNavigationAction, Button, makeStyles } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useContext } from "react";
import { AuthContext } from "../../context";

export default function DashBoard() {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  console.log(authContext.isLoggedIn);
  return (
    authContext.isLoggedIn && (
      <div className={classes.root}>
        <div className={classes.userData}>
          <Avatar className={classes.avatar}></Avatar>
          <div className={classes.title}>
            <p>
              USERNAME
              <br />
              PayBill for month -2000
            </p>
          </div>
        </div>
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
          >
            ADD CARD
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
          >
            VIEW CARDS
          </Button>
        </div>
        <BottomNavigation
        showLabels
        value
        >
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </div>
    )
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
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
    margin: 10,
    lineHeight: 1.4,
  },
  title: {
    marginLeft: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  button: {
    width: "50%",
    margin: "20px 10px",
  },
}));
