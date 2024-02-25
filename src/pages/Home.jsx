import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context/MyContext'
import MyTasks from '../components/MyTasks';

const Home = () => {
    const myState = useContext(MyContext);
    
    const container = `bg-gray-900 text-gray-200 p-4`;
    const wrapper = `flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-center gap-7 `;

    return (
        <>
            <div className={container}>
                {
                    myState.isAuthenticated === true ? (
                        <div> <MyTasks /> </div>
                    ) : (
                        <div className={wrapper}>
                            <div>Login & Register to Create Task </div>
                        </div>
                    )
                }
            </div >
        </>
    )
}

export default Home
