import React from 'react';
import Card from './Card/Card';
import { makeStyles } from "@material-ui/core/styles";

export default function ViewCard() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
        <Card/>
        <Card/>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    }



}))