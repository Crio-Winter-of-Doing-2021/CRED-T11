import React,{useContext} from 'react';
import {AuthContext} from '../../context';

export default function DashBoard() {
    const authContext = useContext(AuthContext);
    console.log(authContext.isLoggedIn)
    return (
        authContext.isLoggedIn  
        &&
        <div>
            Protected Component
        </div>

    )
}
