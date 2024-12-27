import React, { useState } from 'react'
import InputTags from './InputTags'
import { RxCross2 } from "react-icons/rx";
import axiosInstance from '../utils/axiosInstance';
const AddNote = ({noteData, type, onClose, getAllNotes, handleToastShow }) => {
    const [title, setTitle] = useState(noteData?.title || '');
    const [content, setContent] = useState(noteData?.content || '');
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);


    const AddNote = async () => {
        try {
            const response = await axiosInstance.post('/add-note', { 
                title: title, 
                content: content, 
                tags: tags });
            if(response.data){
                getAllNotes();
                onClose();
                handleToastShow("Note added successfully.");
            }
        } catch (error) {
            console.log(error);
            if(error.response&&
                error.response.data&&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }
        }
    }

    const editNote = async () => {
        const noteId = noteData._id;
        const response = await axiosInstance.put('/edit-note/'+noteId, {
            title: title,
            content: content,
            tags: tags
        })
        if(response.data){
            getAllNotes();
            onClose();
        }
    }
    const handleAddNote = () => {
        if(!title){
            setError("Please Enter a title.");
            return;
        }
        if(!content){
            setError("Please Enter a content.");
            return;
        }
        setError(null);

        if(type == 'edit'){
            editNote();
        }else{
            AddNote();
        }
    }
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

            {error && <p className='mx-5 my-2 text-red-600'>{error}</p>}
            <button 
            onClick={handleAddNote}
            className='flex items-center justify-center w-full py-2 mt-4 text-white bg-red-600 rounded-md'>
                {type === "edit" ? "Edit" : "Add"}
            </button>
        </div>
    )
}

export default AddNote