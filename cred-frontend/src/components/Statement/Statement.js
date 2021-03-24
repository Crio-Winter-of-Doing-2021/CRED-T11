import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Statement() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        <h3 >My statement</h3>
        <Link className={classes.link} to="/pay">
          <Button variant="outlined" color="primary">
            pay
          </Button>
        </Link>
      </div>
      <Timeline align="left">
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
               ₹ 222
              </Typography>
              <Typography>vendor - PNB (Debit)</Typography>
              <Typography>category - swiggy</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
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
              ₹ 505
              </Typography>
              <Typography>vendor - SBI (Debit)</Typography>
              <Typography>category - curefit</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    textDecoration: 'none' 
  },
}));
