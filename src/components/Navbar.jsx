import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import task_app from '../assets/task_app.jpg'
import MyContext from '../context/MyContext'
import { Social } from '../constant/social'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const auth = useContext(MyContext);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const navbarContainer = `flex justify-around items-center gap-2 p-4 text-lime-500 text-lg bg-black w-full sticky top-0`;
    const logo = ` text-xl font-semibold text-yellow-400`;
    const logoImg = 'rounded-full'
    const logoWrapper = `flex justify-center items-center gap-2`
    const nav = `flex justify-center items-center list-none gap-4 md:gap-16 `;
    const navLink = `hover:text-lime-300 md:text-xl text-lg font-semibold`;

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

            <div className={navbarContainer}>
                <Link to={'/'}>
                    <div className={logoWrapper}>
                        <img
                            className={logoImg}
                            src={task_app}
                            alt="Logo"
                            height={'40px'}
                            width={'40px'}
                        />
                        <div className={logo}>{Social.title}</div>
                    </div>
                </Link>

                <div className={nav}>
                    {
                        (auth.isAuthenticated) &&
                        <Link to={'/'}><li className={navLink} onClick={scrollToTop}> Tasks </li></Link>
                    }
                    {
                        (!auth.isAuthenticated) &&
                        <Link to={'/login'}><li className={navLink} onClick={scrollToTop}>Login </li></Link>
                    }
                    {
                        (!auth.isAuthenticated) &&
                        <Link to={'/register'}><li className={navLink} onClick={scrollToTop}>Register </li></Link>
                    }
                    {
                        (auth.isAuthenticated) &&
                        <Link to={'/addtask'}><li className={navLink} onClick={scrollToTop}>Add </li></Link>
                    }
                    {
                        (auth.isAuthenticated) &&
                        <Link to={'/profile'}><li className={navLink} onClick={scrollToTop}>Profile </li></Link>
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar
