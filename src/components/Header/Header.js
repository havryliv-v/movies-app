import React from 'react'
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import './header.scss'
const Header = () => {
   return (
      <div className='header'>
         <Link to='/'>
            <div className="logo"> Movie App</div>

         </Link>
         <div className="user-image">
            <PersonIcon color='primary' fontSize='large' alt='user' />
         </div>
      </div>
   )
}

export default Header