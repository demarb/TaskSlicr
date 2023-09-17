import React from 'react'
import { auth } from '../config/firebase';
import { Route } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';

export default function PrivateRoute({ path, element, children }) {

    const isAuthenticated = auth.currentUser !== null;
    // const navigate = useNavigate()

    if (!isAuthenticated){
        console.log("You are not logged In")
        // navigate("/")
        return <Navigate to="/"/>
    }else{
        console.log("You are logged In")
        return children
    }

}
