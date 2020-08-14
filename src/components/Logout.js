import React from 'react'
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../actions/index';

export default function Logout() {
    const dispatch = useDispatch();

    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("compteUser")
    localStorage.removeItem("state")
    dispatch(logout());

    return (<Redirect to="/" />)

}
