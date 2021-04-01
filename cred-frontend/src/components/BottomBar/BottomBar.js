import React, {useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { AuthContext } from "../../context";
import { Redirect, useHistory } from "react-router";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const authContext = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const logout = () => {
    authContext.logout();

  }


  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          onClick={() => history.push("/addcard")}
          label="Add card"
          icon={<AddBoxIcon />}
        />
        <BottomNavigationAction
          onClick={() => history.push("/viewcards")}
          label="View card"
          icon={<CreditCardIcon />}
        />
        <BottomNavigationAction
          onClick={() => logout()}
          label="Log out"
          icon={<ExitToAppIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    // width: 500,
  },
});
