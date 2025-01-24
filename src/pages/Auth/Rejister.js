import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";


const Rejister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();//it is a hook so we need to create a variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://furniturefusion-mern.onrender.com/api/v1/auth/rejister`, {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    // console.log(process.env.REACT_APP_API)

    return (
        <Layout title={'Rejister Ecommerce App'}>
            <div className="form-container">
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Your name " className="form-control" id="exampleInputEmail1" />

                    </div>
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

                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Enter Your Phone Number " className="form-control" id="exampleInputEmail1" />

                    </div>
                    <div className="mb-3">
                        <input
                            val={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="Enter Your Address " className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <input
                            val={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            type="text"
                            placeholder="Enter Your favourite sports " className="form-control" id="exampleInputEmail1" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Rejister