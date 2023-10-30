import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import './header.scss'
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
const Header = () => {
   const dispatch = useDispatch()
   const [term, setTerm] = useState('')
   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(fetchAsyncMovies(term))
      dispatch(fetchAsyncShows(term))
      setTerm('')
   }
   return (
      <div className='header'>

         <div className="logo"> <Link to='/'> Movie App</Link></div>

         <div className="search-bar">
            <form onSubmit={submitHandler} action="">
               <input type="text" value={term} placeholder='Search Movie or Show' onChange={(e) => { setTerm(e.target.value) }} />
               <button type='submit' > <i className='fa fa-search' /></button>
            </form>
         </div>
         <div className="user-image">
            <PersonIcon color='primary' fontSize='large' alt='user' />
         </div>
      </div>
   )
}

export default Header