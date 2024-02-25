import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MyContext from '../context/MyContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddTask() {

    const myState = useContext(MyContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const fetchTask = async () => {
            const api = await axios.get(`https://task-app-backend-abza.onrender.com/tasks/task/${myState.id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            //console.log(api.data.data.title);
            setTitle(api.data.data.title)
            setDescription(api.data.data.description)
            setDueDate(api.data.data.dueDate);
        }

        fetchTask();
    }, [myState.id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!myState.id) {
            try {
                const api = await axios.post(`https://task-app-backend-abza.onrender.com/tasks/new`, {
                    title,
                    dueDate,
                    description
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });

                // console.log(api);
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

                myState.setIsAuthenticated(true);

                setTimeout(() => {
                    navigate('/')
                }, 1000);

            } catch (error) {
                // console.error(error)
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
        } else {
            try {
                const api = await axios.put(`https://task-app-backend-abza.onrender.com/tasks/${myState.id}`, {
                    title,
                    dueDate,
                    description,
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });

                // console.log(api);
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

                myState.setIsAuthenticated(true);

                setTimeout(() => {
                    navigate('/')
                }, 1000);

                myState.setId("");

            } catch (error) {
                // console.error(error)
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
    }

    const container = `bg-gray-900 text-gray-200 p-4`;
    const wrapper = `flex flex-col gap-7 md:justify-center md:items-center my-3`;
    const titleStyle = `text-center text-yellow-400 text-2xl font-semibold`;
    const addTaskForm = `flex flex-col gap-6 bg-gray-950 p-9 rounded-lg md:w-3/4`;
    const labelInputWrapper = 'flex flex-col gap-2'
    const labelStyle = 'font-semibold ml-2'
    const inputStyle = `bg-gray-700 h-12 p-3 rounded-lg`;
    const inputStyleTextArea = 'bg-gray-700 p-3 rounded-lg'
    const addTaskButton = `text-gray-900 h-12 rounded-lg bg-lime-500 hover:bg-lime-400`

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
                    <div>
                        {
                            (myState.id) ? (
                                <h1 className={titleStyle}>Update Task</h1>
                            ) : (
                                <h1 className={titleStyle}>Add Task</h1>
                            )
                        }
                    </div>

                    <form onSubmit={handleSubmit} className={addTaskForm}>
                        <div className={labelInputWrapper}>
                            <label htmlFor="titleText" className={labelStyle}>Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className={inputStyle}
                                id="titleText"
                            />
                        </div>

                        <div className={labelInputWrapper}>
                            <label htmlFor="dueDate" className={labelStyle}> Due Date</label>
                            <input
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                type="text"
                                className={inputStyle}
                                id="dueDate"
                            />
                        </div>

                        <div className={labelInputWrapper}>
                            <label htmlFor="descriptionText" className={labelStyle}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                id='descriptionText'
                                className={inputStyleTextArea}
                                rows={10}
                                cols={50}
                                placeholder='Todo or Task List'
                            >
                            </textarea>
                        </div>

                        <div className={labelInputWrapper}>
                            {
                                (myState.id) ? (
                                    <button type="submit" className={addTaskButton}>Update Task</button>

                                ) : (
                                    <button type="submit" className={addTaskButton}>Add Task</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTask