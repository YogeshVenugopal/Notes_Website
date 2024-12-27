import React from 'react'
import add from '../assets/add-note-svgrepo-com.svg'
const EmptyCard = ({isSearch}) => {
  return (
    <div className='h-[750px] flex flex-col items-center justify-center'>
        <img src={add} alt="add note" className=' h-[290px]'/>
        <p>{isSearch ? "No notes found" : "Start create Your First note! Press the button below and add your throught to the world"}</p>
    </div>
  )
}

export default EmptyCard