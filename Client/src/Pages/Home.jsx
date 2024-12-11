import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../Components/Header'
import { MdOutlineAdd } from "react-icons/md";
import NoteCard from '../Components/NoteCard'
const Home = () => {
  const onPinNote = () => { }
  const onDelete = () => { }
  const onEdit = () => { }
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className='grid grid-cols-3 gap-5 mt-5 '>
          <NoteCard 
          title={"Finish the project"} 
          date={"27-Dec-2024"}
          content={"Finish the pyexpo project within two dates"} 
          tags={"#python #expo"}
          onPinNote={onPinNote} 
          onDelete={onDelete} 
          onEdit={onEdit} />
        </div>
      </div>
      <button onClick={() => {}} className='fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-gray-200 flex justify-center items-center text-lg font-semibold cursor-pointer'>
        <MdOutlineAdd className='text-2xl font-bold text-red-600'/>
      </button>
    </>
  )
}

export default Home