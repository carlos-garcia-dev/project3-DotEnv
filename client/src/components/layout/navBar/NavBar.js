import  React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './NavBar.css'


import logo from './logo.png'


import AuthService from '../../../service/auth.service'

class Navigation extends Component {
  
    constructor() {
      super()
        this.serviceAuth = new AuthService()
    }

    signOut = () => {

        this.serviceAuth
            .signout()
            .then(res => this.props.storedUser(undefined))
            .catch( err => console.log(err))
    }

render(){

    return (
      
        <Navbar bg='light' expand='md' sticky="top" className='nav-bar'>
                <Link to='/'>
                <Navbar.Brand >
                     <img
                            alt="Logotipo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />

                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>

                        <Link to='/entries'>
                            <Nav.Link as='div'>Entries</Nav.Link>
                        </Link>
                        {
                            this.props.loggedUser
                                ?
                                <Nav.Link as='div' onClick={this.signOut}>Log Out</Nav.Link>
                                :
                                <>
                                    <Link to='/signup'>
                                        <Nav.Link as='div'>Sign Up</Nav.Link>
                                    </Link>
                                    <Link to='/signin'>
                                        <Nav.Link as='div' className='nav-button'>Sign In</Nav.Link>
                                    </Link>
                                </>

                        }
                        <Link to='/profile'>
                            <Nav.Link as='div'>{this.props.loggedUser ? this.props.loggedUser.username : 'Become user'}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default Navigation
