import React, { useEffect, useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { setAxiosAuthToken } from "../../utils/Utils";
import EmptyPage from "../EmptyPage/EmptyPage";

export default function Statement() {
  const classes = useStyles();
  const [statements, setStatements] = useState([]);
  const [outStandingAmount, setOutStandingAmount] = useState(0);
  let { cardId, year, month } = useParams();

  const sumPropertyValue = (items, prop) => items.reduce((a, b) => +a + +b[prop], 0);
  
  useEffect(() => {
    setAxiosAuthToken();
    axios
      .get(`api/cards/${cardId}/statements/${year}/${month}`)
      .then((response) => {
        console.log(response.data.data);
        setStatements(response.data.data.data);
        setOutStandingAmount(sumPropertyValue(response.data.data.data,'amount')- +response.data.data.amount_paid);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);



  return (
    <div>
      <div className={classes.title}>
        <h3>My statement</h3>
        ₹ {outStandingAmount}
        {statements?.length ? (
          <Link className={classes.link} to={`/pay/${cardId}/${outStandingAmount}/${year}/${month}`}>
            <Button variant="outlined" color="primary">
              pay
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>
      {statements?.length ? (
        statements?.map((statement) => {
          return (
            <Timeline key={statement.id} align="left">
              <TimelineItem className={classes.Timeline}>
                <TimelineOppositeContent
                  className={classes.TimelineOppositeContent}
                />
                <TimelineSeparator>
                  <TimelineDot variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.TimelineContent}>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      ₹ {statement.amount}
                    </Typography>
                    <Typography>
                      vendor - {statement.vendor} ({statement.transaction_type})
                    </Typography>
                    <Typography>category - {statement.category}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          );
        })
      ) : (
        <EmptyPage text="you have no statements" />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },
  paper: {
    padding: "6px 16px",
  },
  TimelineContent: {
    marginBottom: 30,
  },
  TimelineOppositeContent: {
    display: "none",
  },
  link: {
    textDecoration: "none",
  },
}));
