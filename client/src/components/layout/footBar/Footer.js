import React from 'react'
import Nav from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Footbar  = () => {

    return (
        <footer bg='dark'>
         <Link to='/signup'> <Nav.Link as='div'>Sign Up</Nav.Link></Link>
        </footer>
    )
}

export default Footbar