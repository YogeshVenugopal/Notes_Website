import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateEmail } from '../utils/Helper';
import TypingAnimation from '../Components/TypingAnimation';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }
        setError(null);
        console.log(email, password);
        console.log(email.trim(), password);
        try {
            const response = await axiosInstance.post('/login', { email: email.trim(), password: password });

            if (response.data && response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                navigate('/Dashboard');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password.');
            } else if (error.response && error.response.status === 403) {
                setError('You do not have permission to access this resource.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
        
    };

    return (
        <>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="w-full h-[100px] flex justify-center items-center border-b border-gray-300 bg-white"
            >
                <div className="w-[90%] flex justify-start items-center">
                    <h1 className="text-3xl font-bold">
                        <span className="text-red-500">N</span>
                        otes Website
                    </h1>
                </div>
            </motion.div>

            {/* Login Section */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
                className="w-full h-[80vh] mt-10 flex justify-center items-center"
            >
                <div className="w-[90%] max-w-md h-auto py-6 rounded-md flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center w-full gap-3 p-4 rounded-md bg-slate-600">
                        <TypingAnimation text="Hello user!" delay={1} size={3} />
                        <TypingAnimation text="Welcome to Notes Website" delay={1.5} size={3} />
                        <TypingAnimation text="Login to Your Account" delay={2} size={1} />
                    </div>

                    <form className="w-full mt-6" onSubmit={handleLogin}>
                        <h1 className="mb-5 text-3xl font-bold text-center">Login to Your Account</h1>

                        {/* Email Input */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                aria-label="Email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-2 py-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                aria-label="Password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-2 py-3 border border-gray-300 rounded-md"
                            />
                            {showPassword ? (
                                <FaEye
                                    className="absolute text-gray-600 cursor-pointer right-3 top-4"
                                    onClick={togglePassword}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="absolute text-gray-600 cursor-pointer right-3 top-4"
                                    onClick={togglePassword}
                                />
                            )}
                        </div>

                        {/* Error Message */}
                        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 font-bold text-white transition bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Login
                        </button>

                        {/* Signup Link */}
                        <div className="flex items-center justify-center gap-2 mt-5">
                            <p>Don't have an account?</p>
                            <Link
                                to="/signup"
                                className="text-red-500 underline transition hover:text-blue-600"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
};

export default Login;
