import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function Card(props) {
  const classes = useStyles();
  const { cardName, cardNo, expiryDate, } = props;

  return (
    <React.Fragment>
      <div className={classes.cardStyle}>
        <div className={classes.card}>
          <div className={classes.cardNumber}>
            <span className={classes.numberSection}>{cardNo.slice(0,4)+' '+cardNo.slice(4,8)+' '+cardNo.slice(8,12)+' '+cardNo.slice(12)}</span>
          </div>
          <div className={classes.cardInfo}>
            <div className={classes.cardName}>
              <span>Card Holder</span>
              <p className={classes.p}>{cardName}</p>
            </div>
            <div className={classes.cardExpiry}>
              <span>Expires</span>
              <p className={classes.p}>{expiryDate.split("-").join("/")}</p>
            </div>
          </div>
        </div>
        <Link className={classes.link} to="/statement">
          <Button className={classes.Button} variant="outlined" color="primary">
            view statement
          </Button>
        </Link>
        <Link className={classes.link} to="/pay">
          <Button variant="outlined" color="primary">
            pay
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    fontFamily: '"Space Mono", monospace',
    textShadow: "0 1px 1px rgba(0, 0, 0, 0.3)",
    height: "200px",
    width: "320px",
    flex: "0 0 auto",
    padding: "2em 2em",
  },
  card: {
    height: "100%",
    borderRadius: "8px",
    boxShadow: "1px 1px #aaa3a3",
    background: "linear-gradient(45deg, #343a40, #666666, #343a40)",
    color: "#fff",
  },
  cardNumber: {
    position: "relative",
    top: "75px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2em",
    wordSpacing: "8px",
    letterSpacing: "2px",
    padding: "0 1em",
  },
  p: {
    marginTop: "8px",
    fontSize: "15px",
  },
  cardInfo: {
    display: "flex",
    flexDirection: " row",
    justifyContent: "space-between",
    letterSpacing: "1px",
    lineHeight: "18px",
    textTransform: "uppercase",
    position: "relative",
    top: "110px",
    padding: "0 1em",
  },
  Button: {
    margin: "10px 10px 10px 0px",
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none'
  },
  cardName: {},
  cardExpiry: {},
}));
