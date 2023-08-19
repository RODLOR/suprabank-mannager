import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");



    const his = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            var val = ''
            try {
                val = await axios.get("http://localhost:4000/login");
                if (val.data.user) {
                    his('/')
                }
            }
            catch (error) {
                console.log(error);
                setMsg('No server connection!!');
            }
        }
        checkLogin();
    }, [])

    const onSub = async (e) => {
        e.preventDefault();
        var val = await axios.post("http://localhost:4000/login", user);
        console.log(val);
        setShow(val.data.login);
        if (val.data.msg) {
            setMsg(val.data.msg);
        }
    }

    useEffect(() => {
        if (show) {
            his("/");
        }
    }, [show])


    axios.defaults.withCredentials = true;

    const userInput = (event) => {
        const { name, value } = event.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    return (

        <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800 bg-white text-white pr-5">
            {msg !== '' ? (
                <div className="bg-red-500 p-2 rounded mb-4">
                    <strong>ERROR</strong> {msg}
                </div>
            ) : ''}
            <form onSubmit={onSub} className="flex flex-col items-center">
                <h1 className='dark:text-white text-gray-800 text-2xl font-bold mb-6'>Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="dark:text-white text-gray-800 font-bold">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter email"
                        name="email"
                        value={user.email}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4 flex flex-col w-full">
                    <label htmlFor="password" className="dark:text-white text-gray-800 font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter password"
                        name="password"
                        value={user.password}
                        onChange={userInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
            <Link to="/register" className="text-green-400 mt-4">
                or create an account
            </Link>
        </div>


    )
}

export default Login;
