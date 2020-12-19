import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import './FootBar.css'




const FootBar = () => {

    return (
        <Navbar bg='dark' className='footbar'>
            <Link to='/signup'> <Nav.Link as='div' className='footbar-links'>Sign Up</Nav.Link></Link>
            <Link to='/signin'> <Nav.Link as='div' className='footbar-links'>Sign In</Nav.Link></Link>
            <Link to='/signin'> <Nav.Link as='div' className='footbar-links'>Become User</Nav.Link></Link>
            <Link to='/signin'> <Nav.Link as='div' className='footbar-links'>About</Nav.Link></Link>
        </Navbar>
    )
}

export default FootBar