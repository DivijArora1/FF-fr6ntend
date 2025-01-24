import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";//custom auth
import { Outlet } from "react-router-dom";
import axios from 'axios'
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        //hit api that we created now ->App.js->pvt dashboard
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth',)
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()//if we get this ..enable this
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />
    //outlet - nested routes. ex in App.js /policy or /pagNotf k beech m
    //enables routing functionality
}