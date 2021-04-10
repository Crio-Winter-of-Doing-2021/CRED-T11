import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import BottomBar from "../BottomBar/BottomBar";
import Lottie from "react-lottie";
import classes from "./DashBoard.module.css";
import addcard from "../../assests/addcard.json";
import pay from "../../assests/paymentSucess.json";
import statement from "../../assests/statement.json";
import family from "../../assests/family.json";

export default function DashBoard() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: addcard,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: pay,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: statement,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions4 = {
    loop: true,
    autoplay: true,
    animationData: family,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
          <div className={classes.info}>
            <Lottie
              style={{ margin: 5 }}
              options={defaultOptions1}
              height={70}
              width={70}
            />
            <div className={classes.infoTitle}>
              <p>Add your card to check statements and outstanding amounts</p>
            </div>
          </div>
          <div className={classes.info}>
            <Lottie
              style={{ margin: 5 }}
              options={defaultOptions2}
              height={70}
              width={70}
            />
            <div className={classes.infoTitle}>
              <p>
                Faster payments for the credit card bill and one tap payment
                available
              </p>
            </div>
          </div>
          <div className={classes.info}>
            <Lottie
              style={{ margin: 5 }}
              options={defaultOptions3}
              height={70}
              width={70}
            />
            <div className={classes.infoTitle}>
              <p>
                You can check your smart statment monthwise with total
                transaction amount
              </p>
            </div>
          </div>
          <div className={classes.info}>
            <Lottie
              style={{ margin: 5 }}
              options={defaultOptions4}
              height={70}
              width={70}
            />
            <div className={classes.infoTitle}>
              <p>
                You can add your family members card as well they can authorize
                you via OTP
              </p>
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
    )
  );
}
