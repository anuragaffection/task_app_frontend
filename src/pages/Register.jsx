import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MyContext from '../context/MyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Register() {

    const myState = useContext(MyContext);
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const api = await axios.post(`https://task-app-backend-abza.onrender.com/users/register`,
                {
                    name,
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );

            toast.success(api.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            myState.setIsAuthenticated(true)

            setTimeout(() => {
                navigate('/login')
            }, 1500);


        }
        catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            myState.setIsAuthenticated(false);
        }
    }

    const container = `bg-gray-900 text-gray-200 p-4`;
    const wrapper = `flex flex-col gap-7 md:justify-center md:items-center my-3`;
    const title = `text-center text-yellow-400 text-2xl font-semibold`;
    const registerForm = `flex flex-col gap-6 bg-gray-950 p-9 rounded-lg md:w-3/4`;
    const labelInputWrapper = 'flex flex-col gap-2'
    const labelStyle = 'font-semibold ml-2'
    const inputStyle = `bg-gray-700 h-12 p-3 rounded-lg`;
    const submitButton = `text-gray-900 h-12 rounded-lg bg-lime-500 hover:bg-lime-400`

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className={container}>
                <div className={wrapper}>
                    <h1 className={title}>Register Here   </h1>
                    <form onSubmit={handleSubmit} className={registerForm}>
                        <div className={labelInputWrapper}>
                            <label htmlFor="exampleInputName" className={labelStyle}>Name </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className={inputStyle}
                                id="exampleInputName"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className={labelInputWrapper}>
                            <label htmlFor="exampleInputEmail" className={labelStyle}>Email address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className={inputStyle}
                                id="exampleInputEmail"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className={labelInputWrapper}>
                            <label htmlFor="exampleInputPassword" className={labelStyle}>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className={inputStyle}
                                id="exampleInputPassword"
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit" className={submitButton}>Submit</button>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Register