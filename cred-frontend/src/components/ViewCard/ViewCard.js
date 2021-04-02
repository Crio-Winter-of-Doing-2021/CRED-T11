import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setAxiosAuthToken } from "../../utils/Utils";
import EmptyPage from "../EmptyPage/EmptyPage";

export default function ViewCard() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("api/viewcard", setAxiosAuthToken())
      .then((response) => {
        console.log(response.data.data);
        setCards(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={classes.container}>
      {cards.length ? (
        cards?.map((card, index) => {
          return (
            <Card
              key={card.id}
              cardId={card.id}
              cardName={card.card_name}
              cardNo={card.card_no}
              expiryDate={card.expiry_date}
            />
          );
        })
      ) : (
        <EmptyPage text="you dont have any card pls add cards" />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
