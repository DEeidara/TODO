import React from 'react';
import {Link} from 'react-router-dom'

const Menu = (user) => {
    return (
        <nav className='nav'>
            <ul>
                <li className='nav-item'>
                    <Link className='nav-link' to='/'>Projects</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/users'>Users</Link>
                </li>
                <li className='nav-item'>
                    {user.user.isAuthenticated() ?
                        <button className='nav-link' onClick={() => user.user.logout()}>Sign
                            out</button>
                        : <Link className='nav-link' to='/login'>Sign in</Link>}
                </li>
            </ul>
        </nav>
    )
}

export default Menu;