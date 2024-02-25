import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext'


function ViewTask() {
    const accessingTask = useContext(MyContext);
    
    const container = `bg-gray-900 text-gray-200 p-4`;
    const wrapper = `flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-center gap-7 `;
    const dataWrapper = `flex flex-col gap-4 bg-gray-950 p-9 rounded-lg md:w-3/4`
    const titleStyle = `text-yellow-400 text-xl`;
    const descriptionStyle = 'whitespace-pre-wrap'
    const readMoreStyle = `text-lime-600 hover:text-lime-400`;

    return (
        <div className={container}>
            <div className={wrapper}>
                <div className={dataWrapper} >
                    <div className={titleStyle}>{accessingTask.singleTask.title}</div>
                    <div> {accessingTask.singleTask.dueDate}</div>
                    <div className={descriptionStyle}> {accessingTask.singleTask.description}</div>
                    <div className={readMoreStyle}>
                        <Link to={"/"}>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask