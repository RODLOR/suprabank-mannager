import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const history = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            let val = await axios.get("http://localhost:4000/login");
            if (val.data.user) {
                history('/')
            }
        }
        checkLogin();
    }, [])
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        tel: '',
        password: '',
        confirmPassword: '',
    });

    const [msg, setMsg] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    axios.defaults.withCredentials = true;

    const onSub = async (e) => {
        e.preventDefault();
        // Verificar si las contraseñas coinciden antes de enviar el formulario
        if (user.password !== user.confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            const { confirmPassword, ...userDataWithoutConfirmPassword } = user;

            try {
                const response = await axios.post("http://localhost:4000/register", userDataWithoutConfirmPassword);

                if (response.data.msg) {
                    setMsg(response.data.msg);
                } else {
                    history("/login");
                }
            } catch (error) {
                console.error("Error while registering:", error);
            }
        }
    };

    const userInput = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800 bg-white text-white pr-5">
            {msg ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">ERROR!</strong>
                    <span className="block sm:inline"> {msg}</span>
                </div>
            ) : null}
            <br />
            <form onSubmit={onSub} className='flex flex-col items-center dark:text-white text-gray-700'>
            <h1 className='dark:text-white text-gray-800 text-2xl font-bold mb-6'>Sign Up</h1>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Full name
                    </label>
                    <input
                        type="text"
                        className="shadow text-gray-700  appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="name"
                        value={user.name}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        value={user.email}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Username
                    </label>
                    <input
                        type="text"
                        className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"

                        name="username"
                        value={user.username}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Phone number
                    </label>
                    <input
                        type="text"
                        className="shadow text-gray-700  appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="tel"
                        value={user.tel}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        className="shadow text-gray-700  appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"

                        name="password"
                        value={user.password}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordMatchError ? 'border-red-500' : ''
                            }`}

                        name="confirmPassword"
                        onChange={userInput}

                        required
                    />
                    {passwordMatchError && (
                        <p className="text-red-500 text-xs italic">Passwords do not match.</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
            <Link to="/login" className="text-green-400 mt-4">
                or return to login
            </Link>
        </div>
    );
};

export default Register;
