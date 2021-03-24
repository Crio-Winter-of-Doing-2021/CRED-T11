import React,{useEffect} from 'react';
import Card from './Card/Card';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

export default function ViewCard() {
    const classes = useStyles();

    useEffect(()=>{
        axios.get('api/viewcard')
        .then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    })
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