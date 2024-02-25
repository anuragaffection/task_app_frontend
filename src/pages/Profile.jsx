import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiSolidUserCircle, BiLogOut } from 'react-icons/bi';
import { MdEmail} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MyContext from '../context/MyContext';
import axios from 'axios';
import MyTasks from '../components/MyTasks';


const Profile = () => {
  const myState = useContext(MyContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(`https://task-app-backend-abza.onrender.com/users/getmyprofile`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      // console.log(api.data.user);
      myState.setUser(api.data.user)
      myState.setIsAuthenticated(true);
    }
    fetchUser();
  }, [])


  const logout = async () => {
    const api = await axios.get('https://task-app-backend-abza.onrender.com/users/logout', {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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

    myState.setIsAuthenticated(false);

    setTimeout(() => {
      navigate('/');
    }, 1500);
  }


  const container = `bg-gray-900 flex flex-col justify-center items-center`;
  const wrapper = `flex flex-col gap-3 text-yellow-400 font-semibold m-4`;
  const iconsStyle = `flex flex-row gap-2`;
  const logoutStyle = `text-lime-500 hover:text-lime-300 text-lg font-semibold flex flex-row gap-2`;


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
          
          <div className={iconsStyle}> <BiSolidUserCircle /> {" "} {myState.user.name}</div>
          <div className={iconsStyle}> <MdEmail /> {" "} {myState.user.email}</div>
          {
            (myState.isAuthenticated) &&
            <div className={logoutStyle} onClick={logout}> <BiLogOut /> Logout </div>
          }
        </div>
        <div><MyTasks /></div>
      </div >
    </>
  )
}

export default Profile