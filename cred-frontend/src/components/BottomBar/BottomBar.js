import React, { useContext } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import HomeIcon from "@material-ui/icons/Home";
import { AuthContext } from "../../context";
import { useHistory } from "react-router";
import classes from "./BottomBar.module.css";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const authContext = useContext(AuthContext);
  let history = useHistory();
  const logout = () => {
    authContext.logout();
  };

  return (
    <div className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          className={classes.bottomButton}
          onClick={() => history.push("/dashboard")}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomButton}
          onClick={() => history.push("/addcard")}
          label="Add card"
          icon={<AddBoxIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomButton}
          onClick={() => history.push("/viewcards")}
          label="View card"
          icon={<CreditCardIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomButton}
          onClick={() => logout()}
          label="Log out"
          icon={<ExitToAppIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
