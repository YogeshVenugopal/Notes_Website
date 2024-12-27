import React,{useState} from 'react'
import { motion } from 'framer-motion'
import ProfileInfo from '../Components/ProfileInfo'
import { useNavigate } from 'react-router-dom';
import SerachBox from '../Components/SerachBox';

const Header = ({userInfo,onSearch,handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    if(searchQuery){
      onSearch(searchQuery);
    }
    
  }
  const handleClear = () => {
    setSearchQuery('');
    handleClearSearch();
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className='w-full h-[100px] flex justify-center items-center border-b border-gray-300 bg-white'>
      <div className='w-[90%] flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>
          <span className='text-red-500'>N</span>
          otes Website
        </h1>
        <SerachBox value={searchQuery} onChange={({ target }) => { setSearchQuery(target.value) }} handleSearch={handleSearch} handleClear={handleClear} />
        <ProfileInfo userInfo={userInfo} onLogout={() => { handleLogout() }} />
      </div>
    </motion.div>
  )
}

export default Header