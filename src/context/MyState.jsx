
import React, { useState } from 'react'
import MyContext from './MyContext.jsx'


function MyState(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({});
    const [id, setId] = useState("")
    const [singleTask, setSingleTask] = useState({});

    return (
        <MyContext.Provider
            value={{
                isAuthenticated,
                user,
                id,
                singleTask,
                setIsAuthenticated,
                setUser,
                setId,
                setSingleTask
            }}
        >
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState



// const [isAuthenticated, setIsAuthenticated] = protected routing 
// const [user, setUser] = 
// const [id, setId] = 
// const [singleTask, setSingleTask] = 
