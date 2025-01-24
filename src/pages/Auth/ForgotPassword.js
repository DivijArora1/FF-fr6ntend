import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {

                toast.success(res.data && res.data.message);


                navigate("/login");//redirect to homne page
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={'Forgot-Password'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className=''>Reset Password</h4>
                    <div className="mb-3">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter Your Email " className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            type="text"
                            placeholder="Enter Your Favourite Sports " className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="Enter Your Pssword "
                            className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword