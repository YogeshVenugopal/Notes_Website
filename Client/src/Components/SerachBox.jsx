import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
const SerachBox = ({ value, onChange, handleSearch, handleClear }) => {
    return (
        <div className='w-[30%] flex items-center bg-gray-200 rounded-md justify-between px-4 h-[40px]'>
            <input
                type="text"
                placeholder='Search your notes..!'
                value={value}
                onChange={onChange}
                className='w-[80%] px-2 py-1 rounded-md bg-transparent outline-none'
            />
            {value && (<RxCross2
                onClick={handleClear}
                className='text-lg font-semibold text-gray-500 cursor-pointer hover:text-black' />)}
            <FaMagnifyingGlass
                onClick={handleSearch}
                className='text-lg font-semibold text-gray-500 cursor-pointer hover:text-black' />
        </div>
    )
}

export default SerachBox