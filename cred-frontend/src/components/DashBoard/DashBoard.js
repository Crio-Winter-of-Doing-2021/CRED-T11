import { Avatar, BottomNavigation, BottomNavigationAction, Button, makeStyles } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { Redirect,useHistory } from 'react-router-dom';

export default function DashBoard() {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const user = authContext.user;
  const handleOption = (type) => {
    console.log(type)
    switch (type) {
      case 'ADD':
        return history.push('/addcard');
      case 'VIEW':
        return history.push('/viewCards');
    }
  }
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
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
            onClick={() => { handleOption('ADD') }}
          >
            ADD CARD
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
            onClick={() => { handleOption('VIEW') }}
          >
            VIEW CARDS
          </Button>
        </div>
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
    padding: 10,
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
