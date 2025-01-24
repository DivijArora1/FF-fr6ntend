import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { toast } from 'react-toastify';
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://furniturefusion-mern.onrender.com/api/v1/auth/login`, {
                email,
                password,
                // answer,
            });
            if (res && res.data.success) {

                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/");//redirect to homne page
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={'Login - Ecommerce App'} >
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Login Page</h1>
                    <div className="mb-3">

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter Your Email " className="form-control" id="exampleInputEmail1" />

                    </div>
                    <div className="mb-3">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter Your Password "
                            className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">

                        <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }} >Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login