import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import axios from "axios";
import { setAxiosAuthToken } from "../../utils/Utils";
import EmptyPage from "../EmptyPage/EmptyPage";
import BottomBar from "../BottomBar/BottomBar";
import classes from "./ViewCard.module.css";

export default function ViewCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("api/viewcard", setAxiosAuthToken())
      .then((response) => {
        setCards(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div >
      <h3 className={classes.title}>ALL CARDS HERE</h3>
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
      <BottomBar />
    </div>
  );
}
