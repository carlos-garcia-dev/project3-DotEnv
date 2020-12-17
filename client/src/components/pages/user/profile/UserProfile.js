import React, { Component } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'

import Loader from '../../../shared/loader/Loader'

import PublicationListCard from '../../publication/list/PublicationListCard'


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


    handleSubmit = e => {
        e.preventDefault()

        this.serviceUser
            .putUser(this.state.siggnedUser)
            .then(signnedUser => {
                this.props.storeUser(signnedUser.data)
                this.props.history.push('/')})
            .catch(err => console.log({err}))
    }


    handleImageUpload = e => {
        const uploadData = new FormData()

        uploadData.append('avatar', e.target.files[0])

        // e.target.files.size >= 4000 ? e.target.files. : <Alert></Alert>

        this.setState({ uploadingActive: true })


        this.serviceFiles
            .uploadAvatar(uploadData)
            .then(response => this.setState({
                siggnedUser: { ...this.state.siggnedUser, avatar: response.data.secure_url },
                uploadingActive: false }))
            .catch(err => console.log('ERROR:', err))
    }






    render() {
    return (
            
            <Container>
                

                <h1 className="page-title">{ this.state.signnedUser.username }'s profile</h1>
            
                <img src={this.state.signnedUser.avatar} alt={this.state.signnedUser.username } />


                
{/* 
                <Form style={{margin: "10px"}} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="avatar" >
                        <Form.Label>Images  {this.state.uploadingActive && <Loader />} </Form.Label>
                        <Form.Control type="file" name="avatar" onChange={this.handleImageUpload} />
                    </Form.Group>

                    <Button className="float-right" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading...' : 'Submit changes'}</Button>
                </Form>
             */}
                
            <PublicationListCard />
                {/* {this.state.map.publications} */}

            </Container>
            
        
        
        
        ) 
    }
}