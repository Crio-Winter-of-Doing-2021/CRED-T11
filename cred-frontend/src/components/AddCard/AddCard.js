import { TextField } from '@material-ui/core';
import React from 'react'
import { useForm } from "react-hook-form";

export default function AddCard() {
    const { handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
      }

    return (
        <div>
            <span>Add your card</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                />

            </form>
            
        </div>
    )
}
