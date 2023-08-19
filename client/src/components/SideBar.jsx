
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowOpen from '../assets/arrowOpen.svg'
import navIcon from "../assets/navIcon.svg"
import userNoImg from "../assets/ejeImg.png"
import customers from "../assets/customers.svg"
import dashboard from "../assets/dashboard.svg"
import loans from "../assets/loans.svg"
import stocks from "../assets/stocks.svg"
import transactions from "../assets/transactions.svg"
import axios from "axios";
import Settings from './Settings'

const ProfileSettings = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileOpen(false);
    };

    return (
        <div>
            {isProfileOpen && <Settings tab="profile" onClose={closeProfileModal} />}
            <button
                className={`flex w-full items-center gap-2.5 p-3 text-sm transition-colors duration-300 ${isProfileOpen ? 'bg-gray-300 dark:bg-slate-700' : 'hover:bg-gray-300 dark:hover:bg-slate-700'
                    }`}
                onClick={openProfileModal}
            >
                <svg
                    className="dark:fill-gray-200 fill-gray-700"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
                        fill=""
                    ></path>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 13C7.33726 13 5.73823 13.7585 4.80115 14.9004C4.32556 15.48 3.99121 16.1971 3.9621 16.9919C3.93237 17.8036 4.22536 18.5958 4.82958 19.2871C6.30215 20.9716 8.65327 22 12 22C15.3467 22 17.6979 20.9716 19.1704 19.2871C19.7746 18.5958 20.0676 17.8036 20.0379 16.9919C20.0088 16.1971 19.6744 15.48 19.1989 14.9004C18.2618 13.7585 16.6627 13 15 13H9Z"
                        fill=""
                    ></path>
                </svg>
                Profile Settings
            </button>
        </div>
    );
};




const UsersButton = () => {
    const [name, setName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(userNoImg)

    const his = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkLogin = async () => {
            try{
            var val = await axios.get("http://localhost:4000/login");
            if (val.data.user) {
                setName(val.data.user[0].name)
            }
            else {
                his("/login")
            }
            if (val.data.user[0].username != null) {
                setProfilePhoto(`http://localhost:4000/${val.data.user[0].profile_photo}`)
            }
            else { setProfilePhoto(userNoImg) }

        } catch(error) {
            his("/login")
            console.log(error);
        }

        }
        checkLogin();
    }, [])

    const logout = async () => {
        try {
            await axios.post("http://localhost:4000/logout");
            // Redirect the user to the login page after successful logout
            his("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const targetRef = useRef(null);

    const closeMenu = (event) => {
        if (targetRef.current && !targetRef.current.contains(event.target)) {
            setOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);

    return (
        <div className="relative">
            <div ref={targetRef} className={`${!open ? 'hidden' : ''} dark:bg-slate-900 bg-gray-200 absolute bottom-14 left-0 z-20 w-full overflow-hidden rounded-md opacity-100`} role="menu">
                <nav className="">
                    <ProfileSettings />
                    <button
                        className="flex w-full items-center gap-2.5 p-3 text-sm transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                        onClick={logout}
                    >
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="16px"
                            width="16px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Log out
                    </button>
                </nav>
            </div>
            <button
                className="flex w-full items-center justify-between gap-2.5 rounded-md px-3 py-3 text-sm transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-state="closed"
                id="headlessui-menu-button"
                onClick={toggleMenu}
            >
                <div className="flex gap-2.5 items-center">
                    <div className="relative flex">
                        <img
                            alt="User"
                            className="rounded-md w-8"
                            src={profilePhoto}
                        />
                    </div>
                    <span className="flex items-center truncate h-5 w-full sm:w-32 overflow-hidden  text-ellipsis whitespace-nowrap text-start">
                        {name}
                    </span>
                </div>
                <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 flex-shrink-0 text-gray-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                </svg>
            </button>
        </div>)
}

export default function Sidebar() {
    const location = useLocation()
    const isActive = (pathname) => {
        return location.pathname === pathname ? true : false;
    };

    const [open, setOpen] = useState(true);
    const [rotation, setRotation] = useState('rotate-180');

    const toggleMenu = () => {
        setOpen(!open);
        rotation === 'rotate-180' ? setRotation('rotate-0') : setRotation('rotate-180');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            toggleMenu();
        }
    };

    return (isActive("/register") === true || isActive("/login") === true ? null :

        <aside
            id="SideBar"
            className={`${open ? "w-full sm:w-72 text-gray-400" :
                "w-5 text-transparent text-opacity-0 px-0 "}
                h-screen flex flex-col max-sm:transition-transform fixed z-20 
                sm:sticky sm:top-0 max-sm:-translate-x-full duration-300 bg-white 
                dark:bg-slate-800 dark:text-white text-gray-800`}
        >
            <button
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
                tabIndex="0"
                className={` ${rotation} absolute outline-none -right-0 sm:-right-3 top-4 mt-0.5 z-10 font-bold 
                text-md bg-green-500 shadow-lg p-1 rounded-full transition-all duration-500`}>

                <img
                    className="w-4"
                    src={arrowOpen}
                    alt="toggle menu" />

            </button>
            <div
                className={`${open ? 'even:opacity-100 opacity-0' :
                    ' opacity-100 pointer-events-none cursor-default even:opacity-0'}
                    even:transition-all transition-all flex flex-col h-full duration-400`}>

                <div
                    className="flex flex-col h-screen justify-between px-5">
                    <div>
                        <Link
                            to="/"
                            className={`
                                    ${open ? 'border-b border-gray-500 ' :
                                    'pointer-events-none cursor-default '} 
                                    flex self-start h-14 mb-4 mt-1`
                            }>
                            <div
                                className="flex"
                            >
                                <div
                                    className="flex flex-col justify-center"
                                >
                                    <img
                                        src={navIcon}
                                        alt="bank icon"
                                        className="h-8"
                                    />
                                </div>
                                <h1
                                    className="flex flex-col justify-center pl-2"
                                    style={{ 'lineHeight': "1.25" }}
                                >
                                    <span
                                        className="dark:text-white text-gray-800 font-bold"
                                    >
                                        SupraBank
                                    </span>
                                    <span
                                        className="dark:text-gray-400 text-gray-500"
                                    >
                                        Mannager
                                    </span>
                                </h1>
                            </div>
                        </Link>
                        <div
                            className="flex flex-col gap-y-2">
                            <div
                                className="flex">
                                <Link
                                    to="/"
                                    className={`${isActive("/") ?
                                        `text-gray-700 bg-gray-200 dark:bg-slate-700 
                                        dark:text-white font-bold ` :
                                        `dark:text-gray-500 dark:bg-slate-800 `} 
                                        flex w-full items-center justify-start gap-2.5 rounded-md
                                        px-3 py-3 text-sm transition-all duration-300 hover:bg-gray-200
                                        dark:hover:bg-slate-700`}
                                >
                                    <img
                                        src={dashboard}
                                        alt="dashboard"
                                        className={`${isActive("/") ?
                                            " bg-green-500 " : "bg-gray-500 "} 
                                    p-0.5 rounded-lg shadow-lg w-6 transition-all duration-300`}
                                    />
                                    <span
                                        className={"flex flex-col justify-center transition-all duration-75"}>
                                        Dashboard
                                    </span>
                                </Link>
                            </div>
                            <div
                                className="flex ">
                                <Link
                                    to="/customers"
                                    className={`${isActive("/customers") ?
                                        `text-gray-700 bg-gray-200 dark:bg-slate-700 dark:text-white font-bold ` :
                                        ` dark:text-gray-500 dark:bg-slate-800 `} 
                                    flex w-full items-center justify-start gap-2.5 rounded-md px-3 py-3 text-sm transition-all 
                                    duration-300 hover:bg-gray-200 dark:hover:bg-slate-700`}
                                >
                                    <img className={`${isActive("/customers") ? " bg-green-500 " : "bg-gray-500 "} 
                                    rounded-lg shadow-lg w-6 transition-all duration-300`}
                                        src={customers}
                                        alt="customers"
                                    />
                                    <span
                                        className={"flex flex-col justify-center transition-all duration-75"}
                                    >
                                        Customers
                                    </span>
                                </Link>
                            </div>
                            <div
                                className="flex ">
                                <Link
                                    to="/loans"
                                    className={`${isActive("/loans") ?
                                        `text-gray-700 bg-gray-200 dark:bg-slate-700 dark:text-white font-bold ` :
                                        ` dark:text-gray-500 dark:bg-slate-800 `} 
                                    flex w-full items-center justify-start gap-2.5 rounded-md px-3 py-3 text-sm transition-all 
                                    duration-300 hover:bg-gray-200 dark:hover:bg-slate-700`}
                                >
                                    <img className={`${isActive("/loans") ? " bg-green-500 " : "bg-gray-500 "} 
                                    rounded-lg shadow-lg w-6 p-0.5 transition-all duration-300`}
                                        src={loans}
                                        alt="loans"
                                    />
                                    <span
                                        className={"flex flex-col justify-center transition-all duration-75"}
                                    >
                                        Loans
                                    </span>
                                </Link>
                            </div>
                            <div
                                className="flex ">
                                <Link
                                    to="/stocks"
                                    className={`${isActive("/stocks") ?
                                        `text-gray-700 bg-gray-200 dark:bg-slate-700 dark:text-white font-bold ` :
                                        ` dark:text-gray-500 dark:bg-slate-800 `} 
                                    flex w-full items-center justify-start gap-2.5 rounded-md px-3 py-3 text-sm transition-all 
                                    duration-300 hover:bg-gray-200 dark:hover:bg-slate-700`}
                                >
                                    <img className={`${isActive("/stocks") ? " bg-green-500 " : "bg-gray-500 "} 
                                    rounded-lg shadow-lg w-6 p-1 transition-all duration-300`}
                                        src={stocks}
                                        alt="stocks"
                                    />
                                    <span
                                        className={"flex flex-col justify-center transition-all duration-75"}
                                    >
                                        Stocks
                                    </span>
                                </Link>
                            </div>
                            <div
                                className="flex ">
                                <Link
                                    to="/transactions"
                                    className={`${isActive("/transactions") ?
                                        `text-gray-700 bg-gray-200 dark:bg-slate-700 dark:text-white font-bold ` :
                                        ` dark:text-gray-500 dark:bg-slate-800 `} 
                                    flex w-full items-center justify-start gap-2.5 rounded-md px-3 py-3 text-sm transition-all 
                                    duration-300 hover:bg-gray-200 dark:hover:bg-slate-700`}
                                >
                                    <img className={`${isActive("/transactions") ? " bg-green-500 " : "bg-gray-500 "} 
                                    rounded-lg shadow-lg w-6 p-1 transition-all duration-300`}
                                        src={transactions}
                                        alt="stocks"
                                    />
                                    <span
                                        className={"flex flex-col justify-center transition-all duration-75"}
                                    >
                                        Transactions
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center flex-col mb-3 pt-3 border-t border-gray-500"
                    >
                        <UsersButton />
                    </div>
                </div>
            </div>
        </aside>)
}