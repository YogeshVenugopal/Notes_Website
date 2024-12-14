import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../Components/Header'
import { MdOutlineAdd } from "react-icons/md";
import NoteCard from '../Components/NoteCard'
import AddNote from '../Components/AddNote';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
const Home = () => {
  const [openAddNotes, setOpenAddNotes] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async()=>{
    try {
      const response = await axiosInstance.get('/get-user');
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login');
      }
    }
  }
  useEffect(() => {
    
    getUserInfo();
    return () => {
      
    }
  }, [])
  
  const [isPin, setIsPin] = useState(false);
  const onPinNote = () => {
    setIsPin(!isPin)
  }
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
            isPinned={isPin}
            onPinNote={onPinNote}
            onDelete={onDelete}
            onEdit={onEdit} />
        </div>
      </div>
      <button onClick={() => { setOpenAddNotes({ isShown: true, type: "add", data: null }) }} className='fixed bottom-7 right-7 w-[50px] h-[50px] rounded-full bg-gray-200 flex justify-center items-center text-lg font-semibold cursor-pointer'>
        <MdOutlineAdd className='text-2xl font-bold text-red-600' />
      </button>



      <Modal
        isOpen={openAddNotes.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        contentLabel=""
        className="w-[40%] h-auto mx-auto bg-white my-40 px-4 py-5 rounded-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <AddNote
          type={openAddNotes.type}
          noteData={openAddNotes.data}
            onClose={() => { setOpenAddNotes({ isShown: false, type: "add", data: null }) }}
          />
        </motion.div>
      </Modal>
    </>
  )
}

export default Home