import React, { useState } from 'react'
import InputTags from './InputTags'
import { RxCross2 } from "react-icons/rx";
const AddNote = ({onClose}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    return (
        <div className='relative'>
            <button
            onClick={onClose}
            className='absolute text-2xl font-semibold text-gray-500 outline-none cursor-pointer top-2 right-2 hover:text-black'
            >
                <RxCross2 />
            </button>
            <div className='flex flex-col gap-5'>
                <label className='text-2xl font-bold text-gray-500'>TITLE:</label>
                <input
                    type="text"
                    placeholder='Add a title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-2 py-1 text-2xl border border-gray-300 rounded-md outline-none w-[90%] mx-auto" />
            </div>
            <div className='flex flex-col gap-5 mt-4'>
                <label className='text-2xl font-bold text-gray-500'>CONTENT:</label>
                <textarea
                    type="text"
                    placeholder='Add a content...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md outline-none w-[90%] mx-auto"
                    rows={10}
                />
            </div>
            <div className='mt-4'>
                <label className='text-2xl font-bold text-gray-500'>TAGS:</label>
                <InputTags tags={tags} setTags={setTags} />
            </div>
            <button className='flex items-center justify-center w-full py-2 mt-4 text-white bg-red-600 rounded-md'>Add</button>
        </div>
    )
}

export default AddNote