import React from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.div 
    initial={{opacity:0, y:-100}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5, ease:"easeIn"}}
    className='w-full h-[100px] flex justify-center items-center border-b border-gray-300 bg-white'>
        <div className='w-[90%] flex justify-start items-center'>
            <h1 className='text-3xl font-bold'>
                <span className='text-red-500'>N</span>
                otes Website
            </h1>
        </div>
    </motion.div>
  )
}

export default Header