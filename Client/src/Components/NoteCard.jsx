import React from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
const NoteCard = ({
    title,date,content,tags,isPinned,onEdit,onDelete,onPinNote
}) => {
  return (
    <div className='flex flex-col items-start justify-center p-2 duration-300 border border-gray-300 hover:transform hover:scale-105 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
        <div className='w-[80%] mx-auto flex items-center justify-between'>
            <div>
                <h6 className='text-xl font-semibold'>{title}</h6>
                <span className='text-gray-500'>{date}</span>
            </div>
            <MdOutlinePushPin onClick={onPinNote} className={`text-2xl font-semibold cursor-pointer ${isPinned ? "text-blue-500" : "text-gray-500"}`}/>
        </div>
        <p className='w-[80%] mx-auto mt-3 text-lg'>{content?.slice(0,50)}</p>
        <div className='w-[80%] mx-auto flex items-center justify-between'>
            <div className='flex items-center gap-2 mt-2 text-gray-500'>{tags}</div>
            <div className='flex items-center gap-2'>
                <FiEdit3 onClick={onEdit}/>
                <FaTrash onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NoteCard