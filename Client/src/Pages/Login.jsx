import React,{useState} from 'react'
import Header from '../Components/Header'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { validateEmail } from '../utils/Helper';
import TypingAnimation from '../Components/TypingAnimation';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    const handleLogin = async(e) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please Enter a valid email address.");
            return;
        }
        if(!password){
            setError("Please Enter a password.");
            return;
        }
        setError(null);
    }
    return (
    <>
        <Header />
        <motion.div 
        initial={{opacity:0, y:100}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5, ease:"easeIn" , delay:0.5}}
        className='w-full h-[80vh] mt-10 flex justify-center items-center'>
            <div className='w-[35%] h-auto py-6 rounded-md flex justify-center items-center flex-col'>
                <div className='w-[90%] h-[200px] bg-slate-600 rounded-md flex flex-col justify-center items-center gap-3'>
                <TypingAnimation text="Hello user!" delay={1} size={3}/>
                  <TypingAnimation text="Welcome to Notes Website" delay={1.5} size={3}/>
                  <TypingAnimation text="Login Your Account" delay={2} size={1}/>
                </div>
                <form className='w-[90%] mx-auto h-auto' onSubmit={handleLogin}>
                    <h1 className='text-2xl font-bold w-full text-center'>Login</h1>
                    <div className="relative">
                        <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Enter Your Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full h-[20px] border border-gray-300 mt-5 rounded-md py-5 px-2'/>
                    </div>
                    <div className="relative">
                        <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"  
                        id="password" 
                        placeholder="Enter Your Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full h-[20px] border border-gray-300 mt-5 rounded-md py-5 px-2'/>
                    {
                        showPassword ? (
                            <FaEye 
                                className='absolute right-2 bottom-3 cursor-pointer'
                                onClick={togglePassword}
                            />
                        ) : (
                            <FaEyeSlash 
                                className='absolute right-2 bottom-3 cursor-pointer'
                                onClick={togglePassword}
                            />
                        )
                    }
                    </div>
                    {error && <p className='text-red-600 mt-4'>{error}</p>}
                    <button className="primary-btn" type='submit'>
                        Login
                    </button>
                    <div className='w-full flex justify-center items-center gap-2 mt-5'>
                        <p>Don't have an account?</p>
                        <Link to="/signup" className='text-red-500 underline hover:text-blue-600'>Create an account</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    </>
  )
}

export default Login