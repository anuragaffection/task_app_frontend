import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MyContext from '../context/MyContext'


function MyTasks() {

    const [Task, setTask] = useState([]); 
    const myState = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const api = await axios.get(`https://task-app-backend-abza.onrender.com/tasks/mytasks`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setTask(api.data.data);
        }
        fetchTask();
    }, []);


    const deleteTask = async (id) => {
        const api = await axios.delete(`https://task-app-backend-abza.onrender.com/tasks/task/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

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
    }


    const editTask = async (id) => {
        myState.setId(id);
        navigate('/addTask')
    }


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    };


    const container = `bg-gray-900 text-gray-200 p-4`;
    const wrapper = `flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-center gap-7 `;
    const dataWrapper = `flex flex-col gap-4 bg-gray-950 p-9 rounded-lg md:w-5/12`
    const titleStyle = `text-yellow-400 text-2xl font-semibold`;
    const dateProfileWrapper = `flex flex-row gap-3`
    const buttonWrapper = 'flex flex-row gap-6 justify-center text-gray-900 font-semibold'
    const editButton = `bg-rose-700 hover:bg-rose-500 h-12 px-5 rounded-lg`;
    const viewButton = 'bg-lime-500 hover:bg-lime-400 h-12 px-5 rounded-lg';
    const deleteButton = 'bg-red-700 hover:bg-red-500 h-12 px-5 rounded-lg'

    return (
        <>
            <div className={container}>
                <div className={wrapper}>
                    {
                        Task && Task.map((data) => {
                            return (
                                <div className={dataWrapper} key={data._id}>
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

                                    <div className={titleStyle}>{data.title}</div>
                                    <div className={dateProfileWrapper}>
                                        <div> {data.dueDate}</div>
                                    </div>

                                    <div>
                                        {
                                            data.description.length > 250
                                                ? `${data.description.substring(0, 251)}...`
                                                : data.description
                                        }
                                    </div>

                                    <div className={buttonWrapper}>
                                        <button className={viewButton}>
                                            <Link
                                                to={"/viewTask"}
                                                onClick={() => {
                                                    myState.setSingleTask(data);
                                                    scrollToTop();
                                                }}
                                            >
                                                View
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => editTask(data._id)}
                                            className={editButton}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(data._id)}
                                            className={deleteButton}>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div >
            </div>
        </>
    )
}

export default MyTasks