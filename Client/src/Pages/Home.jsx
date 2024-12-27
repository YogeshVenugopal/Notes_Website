import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../Components/Header'
import { MdOutlineAdd } from "react-icons/md";
import NoteCard from '../Components/NoteCard'
import moment from 'moment';
import AddNote from '../Components/AddNote';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import ToastMessage from '../Components/ToastMessage';
import EmptyCard from '../Components/EmptyCard';
const Home = () => {
  const [openAddNotes, setOpenAddNotes] = useState({
    isShown: false,
    type: "add",
    data: null
  });
  const [showToast, setShowToast] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const updatePinned = async(noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put('/update-pinned/'+noteId,
        {isPinned:!noteData.isPinned}
      )
      if(response.data){
        handleToastShow("Note updated successfully", "success");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onDelete = async(data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete('/delete-note/'+noteId);
      if(response.data){
        handleToastShow("Note deleted successfully",'delete');
        getAllNotes();
      }
    } catch (error) {
      if(
        error.response&&
        error.response.data&&
        error.response.data.message
      ){
        console.log("Something went wrong");
      }
    }
   }
  const onEdit = (noteDetails) => {
    setOpenAddNotes({
      isShown: true,
      type: "edit",
      data: noteDetails
    })
  }
  const handleToastShow = (message, type) => {
    setShowToast({
      isShown: true,
      message: message,
      type: type
    })
  }
  const handleToastClose = () => {
    setShowToast({
      isShown: false,
      message: "",
    })
  }
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.log("Error fetching user info:", error);
      }
    }
  }
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      } else {
        console.log("Notes not found");
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  }

  const onSearch = async (query) => {
    try {
      const response = await axiosInstance.get('/search-notes', { params: { query } });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes); 
        setIsSearch(true);
      } else {
        console.log("Notes not found");
      } 
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    getAllNotes();
    setIsSearch(false);
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo(); 
  }, []);  
  if (userInfo === null) {
    return <div className='h-[100vh] w-full flex justify-center items-center'>
      <div
        className="w-10 h-10 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"
      ></div>
    </div>;
  }

  return (
    <>
      <Header userInfo={userInfo} onSearch={onSearch} handleClearSearch={handleClearSearch}/>
      {error && <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className='absolute px-5 py-2 text-red-600 border-r-2 border-red-600 rounded-md top-5 right-5 '>{error}</motion.div>}
      <div className="container mx-auto">
        {
          allNotes.length > 0 ?
          <div className='grid grid-cols-1 gap-5 mt-5 md:grid-cols-3'>
          {allNotes.map((item,index) =>(
            <NoteCard
            key={item._id}
            title={item.title}
            date={moment(item.createdOn).format("DD-MM-YYYY")}
            content={item.content}
            tags={item.tags.map(item => `#${item}`).join(" ")}
            isPinned={item.isPinned}
            onPinNote={() => updatePinned(item)}
            onDelete={() => onDelete(item)}
            onEdit={() =>onEdit(item)} />
          ))}
          
        </div>:
        <EmptyCard isSearch={isSearch}/>
        }
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
            getAllNotes={getAllNotes}
            handleToastShow={handleToastShow}
          />
        </motion.div>
      </Modal>

      <ToastMessage 
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleToastClose}
      />
    </>
  )
}

export default Home