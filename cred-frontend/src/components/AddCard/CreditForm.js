import React, { useState, useRef } from "react";
import classes from "./AddCard.module.css";
import classNames from "classnames";
import { setAxiosAuthToken } from "../../utils/Utils";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import alertify from "alertifyjs";
import axios from "axios";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
let MONTHS = [0],
  YEARS = [CURRENT_YEAR];
for (let i = 1; i <= 12; i++) {
  MONTHS.push(i);
  YEARS.push(YEARS[0] + i);
}

export default function CreditForm() {
  const [showcard, setShowcard] = useState(true);
  const [cardType, setcardType] = useState("visa");
  const [cardNumber, setcardNumber] = useState("");
  const [cardName, setcardName] = useState("");
  const [cardMonth, setcardMonth] = useState(0);
  const [cardYear, setcardYear] = useState(0);
  const [toggleMonth, settoggleMonth] = useState(true);
  const [toggleYear, settoggleYear] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [existCard, setExistCard] = useState({});

  let displayNumber = [];

  const handleChange = (event, type) => {
    let { value } = event.target;
    if (type === "cardNumber") {
      value = value.replace(/ /gi, "");
      if (isNaN(value)) {
        return;
      } else {
        setcardNumber(value);
      }
    } else if (type === "cardName") {
      let regName = /^[a-zA-Z\s]*$/;
      if (!regName.test(value)) {
      } else {
        setcardName(value);
      }
    } else if (type === "cardMonth") {
      value = Number(value);
      setcardMonth(value);
      settoggleMonth(!toggleMonth);
    } else if (type === "cardYear") {
      value = Number(value);
      if (value === CURRENT_YEAR && cardMonth <= CURRENT_MONTH) {
        setcardMonth(0);
        setcardYear(value);
        settoggleMonth(!toggleMonth);
        settoggleYear(!toggleYear);
      } else {
        setcardYear(value);
        settoggleYear(!toggleYear);
      }
    }
  };

  const formatCardNumber = (value) => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatEmailSameLength = (emilString) => {
    var splitEmail = emilString.split("@");
    var domain = splitEmail[1];
    var name = splitEmail[0];
    return name
      .substring(0, 3)
      .concat(Array(name.length - 3).join("*"))
      .concat("@")
      .concat(domain);
  };

  const otpValidate = (data) => {
    existCard.code = data.otp;
    axios
      .post("/api/family/addcard", existCard)
      .then((response) => {
        history.push("/viewCards");
        alertify.success(`CARD ADD SUCCESSFULLY`);
      })
      .catch((err) => {
        alertify.error(err.response.data.metadata.message);
      });
  };

  const onSubmit = (data) => {
    let { card_no, card_name, year, month } = data;
    const expiry_date = year + "-" + month;
    card_no = card_no.split(" ").join("");
    data.card_no = card_no;
    const cardData = {
      card_no: card_no,
      card_name: card_name,
      expiry_date: expiry_date,
    };
    setAxiosAuthToken();
    axios
      .post("/api/addcard", cardData)
      .then((response) => {
        if (response?.data?.data?.cardId) {
          setExistCard(response.data.data);
          const email = formatEmailSameLength(response.data.data.email);
          alertify.error(`OTP sent on the ${email}`);
          setOpen(true);
        } else {
          history.push("/viewCards");
          alertify.success(`CARD ADD SUCCESSFULLY`);
        }
      })
      .catch((err) => {
        alertify.error(err.response.data.metadata.message);
      });
  };

  for (let i = 0; i < 16; i++) {
    let displayDigit = "#";
    if (typeof cardNumber[i] !== "undefined") {
      displayDigit = i > 3 && i < 12 ? "*" : cardNumber[i];
    }
    displayNumber.push(displayDigit);
  }
  return (
    <div className={classes.cardform}>
      <div
        className={classNames(
          classes.card,
          classes.container,
          showcard ? classes.show : ""
        )}
      >
        <div className={classNames(classes.card, classes.inner)}>
          <div className={classes.front}>
            <img
              className={classNames(classes.card, classes.cover)}
              src="https://source.unsplash.com/collection/8497941/430x270"
              onLoad={() => setShowcard(true)}
            />
            <div className={classNames(classes.card, classes.overlay)} />
            <div className={classNames(classes.card, classes.content)}>
              <div className={classes.chip} />
              <div className={classNames(classes.type, classes.visa)} />
              <div className={classes.number}>
                {displayNumber.map((digit, index) => (
                  <div className={classes.digitwrapper} key={index}>
                    <div
                      className={
                        digit === "#"
                          ? classNames(classes.digit, classes.shown)
                          : classNames(classes.digit, classes.hidden)
                      }
                    >
                      #
                    </div>
                    <div
                      className={
                        digit === "#"
                          ? classNames(classes.digit, classes.hidden)
                          : classNames(classes.digit, classes.shown)
                      }
                    >
                      {digit === "#" ? "" : digit}
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.name}>
                <label htmlFor="name">Card Holder</label>
                <div id="name">
                  <div
                    className={classNames(
                      classes.placeholder,
                      cardName.length > 0 ? classes.hidden : classes.shown
                    )}
                  >
                    FULL NAME
                  </div>
                  <div className={classes.nameContainer}>
                    {cardName.split("").map((char, index) => (
                      <div
                        className={classNames(
                          classes.character,
                          `${/\s/.test(char)}` ? classes.space : ""
                        )}
                        key={index}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={classes.expiration}>
                <label htmlFor="expiration">Expires</label>
                <div id="expiration">
                  <div
                    className={classNames(
                      classes.doubledigit,
                      `${toggleMonth}` ? classes.toggle1 : classes.toggle2
                    )}
                  >
                    {cardMonth === 0 ? "MM" : `${cardMonth + 100}`.slice(-2)}
                  </div>
                  <div className={classes.doubledigit}>/</div>
                  <div
                    className={classNames(
                      classes.year,
                      classes.doubledigit,
                      `${toggleYear}` ? classes.toggle1 : classes.toggle2
                    )}
                  >
                    {cardYear === 0 ? "YY" : `${cardYear}`.slice(-2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.cardInputs}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.lginput}>
            <label htmlFor="cardNumber" className={classes.label}>
              {" "}
              Card Number
            </label>
            <input
              className={classNames(classes.numberinput, classes.input)}
              id="cardNumber"
              name="card_no"
              type="text"
              onChange={(event) => handleChange(event, "cardNumber")}
              value={formatCardNumber(cardNumber)}
              maxLength="19"
              ref={register}
            />
          </div>
          <div className={classes.lginput}>
            <label htmlFor="cardName" className={classes.label}>
              Card Holder's Name
            </label>
            <input
              className={classNames(classes.input, classes.nameinput)}
              id="cardName"
              name="card_name"
              type="text"
              onChange={(event) => handleChange(event, "cardName")}
              value={cardName}
              maxLength="24"
              ref={register}
            />
          </div>
          <div className={classes.medinput}>
            <label htmlFor="cardMonth" className={classes.label}>
              Expiration Date
            </label>
            <select
              className={classNames(
                classes.input,
                classes.monthinput,
                classes.select
              )}
              id="cardMonth"
              name="month"
              ref={register}
              value={cardMonth}
              onChange={(event) => handleChange(event, "cardMonth")}
            >
              {" "}
              <option value="0" disabled>
                Month
              </option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className={classNames(
                classes.input,
                classes.yearinput,
                classes.select
              )}
              id="cardYear"
              name="year"
              ref={register}
              value={cardYear}
              onChange={(event) => handleChange(event, "cardYear")}
            >
              {" "}
              <option value="0" disabled>
                Year
              </option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            className={classNames(classes.button, classes.lginput)}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Dialog
        open={open}
        ref={ref}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter OTP</DialogTitle>
        <form onSubmit={handleSubmit(otpValidate)}>
          <DialogContent>
            <DialogContentText>
              Please enter OTP which was sent on the email id of original user
              of card
            </DialogContentText>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              type="text"
              id="OTP"
              label="OTP"
              inputRef={register}
              name="otp"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <BottomBar />
    </div>
  );
}
