import React, { useState } from 'react'
import { GrFormAdd } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
const InputTags = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const addNewTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
    }
    const removeTag = (index) => {
        setTags(tags.filter((tag) => tag !== index));
    }
    return (
        <div>
            {tags?.length > 0 &&
                <div className='flex flex-wrap items-center gap-2 mx-2 mt-2'>
                    {
                        tags.map((tag, index) => (
                            <span key={index}
                                className='flex items-center gap-2 px-2 py-1 text-sm border border-gray-300 rounded-md'
                            >
                                #{tag}
                                <button
                                    className='font-bold hover:text-red-500'
                                    onClick={() => removeTag(tag)}>
                                    <RxCross2 />
                                </button>
                            </span>
                        ))}
                </div>}
            <div className='flex items-center gap-4 mt-3'>
                <input
                    type="text"
                    placeholder='Add a tag...'
                    className='px-2 py-1 text-sm border border-gray-300 rounded-md outline-none w-[90%] mx-auto'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={addNewTag}
                    className='px-2 py-2 text-2xl font-bold text-red-500 bg-gray-200 rounded-full'>
                    <GrFormAdd />
                </button>
            </div>
        </div>
    )
}

export default InputTags