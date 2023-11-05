import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import './header.scss'
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
const Header = () => {
   const dispatch = useDispatch()
   const [term, setTerm] = useState('')
   const [error, setError] = useState('');

   const submitHandler = (e) => {
      e.preventDefault()
      if (term.trim() === '' || term.length <= 1) {
         setError('Field is to short or empty');
         setTerm('');
         setTimeout(() => {
            setError('');
         }, 3000);
         return;
      }
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm('');
      setError('')
   }
   return (
      <div className='header'>

         <div className="logo"> <Link to='/' reloadDocument='true'> Movie App</Link></div>

         <div className="search-bar">
            <form onSubmit={submitHandler} action="">
               <input type="text" value={term} placeholder='Search for Movie or Show' onChange={(e) => { setTerm(e.target.value) }} />
               <button type='submit' > <i className='fa fa-search' /></button>
            </form>
            {error && <p className="error-message">{error}</p>}
         </div>
         <div className="user-image">
            <PersonIcon color='primary' fontSize='large' alt='user' />
         </div>
      </div>
   )
}

export default Header