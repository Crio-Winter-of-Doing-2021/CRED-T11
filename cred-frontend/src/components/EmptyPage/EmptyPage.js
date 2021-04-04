import React from 'react'
import Lottie from "react-lottie";
import classes from "./EmptyPage.module.css"
import animationData from "../../assests/empty.json";


export default function EmptyPage({text}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    return (
        <div className={classes.root} >
            <Lottie options={defaultOptions} height={200} width={200} />
            <p className={classes.text} >{text}</p>
        </div>
    )
}
