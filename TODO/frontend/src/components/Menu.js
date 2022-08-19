import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <nav className='nav'>
          <ul>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Projects</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/users'>Users</Link>
            </li>
          </ul>
        </nav>
    )
}

export default Menu;