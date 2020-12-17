import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Col, Row, Form, Button, Modal } from 'react-bootstrap'

import './UserProfileCard.css'


import Loader from '../../../shared/loader/Loader'

import UserProfileCard from '../../user/profile/UserProfileCard'
import PublicationListCard from '../../publication/list/PublicationListCard'
import CommentaryCard from '../../commentary/card/CommentaryCard'


// import ServicePublication from '../../../../service/publication.service'
import ServiceFile from '../../../../service/file.service'
import ServiceUser from '../../../../service/user.service'


export default class UserProfile extends Component {
   
    constructor(props) {
        super(props)
            this.state = {

                signnedUser: this.props.signnedUser,
                uploadingActive: false
            }
        // this.servicePublication = new ServicePublication()
        this.serviceUser = new ServiceUser()
        this.serviceFiles = new ServiceFile()
    }

    
    handleInputChange = e => this.setState({ siggnedUser: { ...this.state.siggnedUser, [e.target.name]: e.target.value }})


    render() {
    return (
        <Container>
            
            <h1 className="page-title"> Profile</h1>
            
            <Row>
                
                <Col md={4}>
                    <aside className="profile-card">
                         {/* <UserProfileCard currentUser={this.state.siggnedUser}  /> */}
                        <img src={this.state.signnedUser.avatar} alt={this.state.signnedUser.username } />
                            <h2>{this.state.signnedUser.username}</h2>
                            <hr></hr>
                            
                            <p>Name</p>
                            <h4>{this.state.signnedUser.name}</h4>
                            <p>Email</p>
                            <p>{this.state.signnedUser.email}</p>
                        <Link to="/profile/edit"><Button className="rounded-0 btn-block" variant="dark">Edit </Button></Link>
                    </aside>          
                </Col>



                        <Col md={8}>

                             <h2 className="section-titles">Your entries</h2>
          
                            {/* {this.state.signnedUser.publications.map(<PublicationListCard />)} */}

                            <h2 className="section-titles">Your comments</h2>
                            {/* {this.state.signnedUser.commentaries.map( <CommentaryCard />) } */}
                        </Col>
            </Row>
        </Container>  
        ) 
    }
}