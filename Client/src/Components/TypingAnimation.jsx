import React from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ text, delay = 0, size = 0 }) => {
    return (
      <div className="inline-block">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: delay + index * 0.05, 
              duration: 0.2 
            }}
            className={ 
                `text-white
                font-anton
                ${ 
                  size === 0 ? 'text-sm' : 
                  size === 1 ? 'text-lg' : 
                  size === 2 ? 'text-3xl' : 
                  size === 3 ? 'text-4xl' : 'text-5xl' 
                }`
              }
              
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };
  

export default TypingAnimation;
