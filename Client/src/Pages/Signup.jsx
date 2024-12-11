import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { validateEmail } from '../utils/Helper';
import TypingAnimation from '../Components/TypingAnimation';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorBox, setEmailErrorBox] = useState(false);
    const [usernameErrorBox, setUsernameErrorBox] = useState(false);
    const [passwordErrorBox, setPasswordErrorBox] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please Enter a valid email address.");
            setEmailErrorBox(true);
            return;
        }
        if (!username) {
            setError("Please Enter a valid username.");
            setUsernameErrorBox(true);
            return;
        }
        if (!password) {
            setError("Please Enter a password.");
            setPasswordErrorBox(true);
            return;
        }
        setError(null);
        setEmailErrorBox(false);
        setUsernameErrorBox(false);
        setPasswordErrorBox(false);
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className='w-full h-[100px] flex justify-center items-center border-b border-gray-300 bg-white'>
                <div className='w-[90%] flex justify-start items-center'>
                    <h1 className='text-3xl font-bold'>
                        <span className='text-red-500'>N</span>
                        otes Website
                    </h1>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
                className='w-full h-[80vh] mt-10 flex justify-center items-center'>
                <div className='w-[35%] h-auto py-6 rounded-md flex justify-center items-center flex-col'>
                    <div className='w-[90%] h-[200px] bg-slate-600 rounded-md flex flex-col justify-center items-center gap-3'>
                        <TypingAnimation text="Hello user!" delay={1} size={3} />
                        <TypingAnimation text="Welcome to Notes Website" delay={1.5} size={3} />
                        <TypingAnimation text="Create Your Account" delay={2} size={1} />
                    </div>
                    <form className='w-[90%] mx-auto h-auto' onSubmit={handleSignup}>
                        <h1 className='w-full my-5 text-3xl font-bold text-center'>Signup Your Account</h1>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Your User name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full h-[20px] border ${usernameErrorBox ? "border-red-600" : "border-gray-300"} mt-5 rounded-md py-5 px-2`} />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full h-[20px] border ${emailErrorBox ? "border-red-600" : "border-gray-300"} mt-5 rounded-md py-5 px-2`} />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full h-[20px] border ${passwordErrorBox ? "border-red-600" : "border-gray-300"} mt-5 rounded-md py-5 px-2`} />
                            {
                                showPassword ? (
                                    <FaEye
                                        className='absolute cursor-pointer right-2 bottom-3'
                                        onClick={togglePassword}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className='absolute cursor-pointer right-2 bottom-3'
                                        onClick={togglePassword}
                                    />
                                )
                            }
                        </div>
                        {error && <p className='mt-4 text-red-600'>{error}</p>}
                        <button className="primary-btn" type='submit'>
                            Signup
                        </button>
                        <div className='flex items-center justify-center w-full gap-2 mt-5'>
                            <p>Already have an Account?</p>
                            <Link to="/login" className='text-red-500 underline hover:text-blue-600'>Signin Account</Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    )
}

export default Signup