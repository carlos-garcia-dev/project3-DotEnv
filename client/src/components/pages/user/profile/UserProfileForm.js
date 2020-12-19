import React, { Component } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'


import ServiceFile from '../../../../service/file.service'
import ServiceUser from '../../../../service/user.service'


// import Loader from '../../../shared/loader/Loader'



export default class UserProfileForm extends Component {

    constructor(props) {
        super(props)
            this.state = {

                signnedUser: this.props.signnedUser,
                uploadingActive: false, 
                visible: this.props.showModal
            }
       
        this.serviceUser = new ServiceUser()
        this.serviceFiles = new ServiceFile()
    }


    handleSubmit = e => {
        e.preventDefault()

        this.serviceUser
            .putUser(this.state.siggnedUser)
            .then(signnedUser => {
                this.props.storeUser(signnedUser.data)
                this.props.history.push('/profile')})
            .catch(err => console.log({err}))
    }


    handleImageUpload = e => {
        const uploadData = new FormData()

        uploadData.append('avatar', e.target.files[0])

        this.setState({ uploadingActive: true })


        this.serviceFiles
            .uploadAvatar(uploadData)
            .then(response => this.setState({
                siggnedUser: { ...this.state.siggnedUser, avatar: response.data.secure_url },
                uploadingActive: false }))
            .catch(err => console.log('ERROR:', err))
    }




    render() {
    return(
        <>
            {/* <ModalForm show={this.state.showModal} /> */}
            {/* <h4>Edit Profile</h4> */}
{/* 
            <Form>

                <Form.Group controlId="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" size="lg" name="name" placeholder={this.state.siggnedUser.name} value={this.state.publication.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" size="lg" name="username" placeholder='Title' value={this.state.publication.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" size="lg" name="email" placeholder='Title' value={this.state.publication.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" size="lg" name="password" placeholder='Title' value={this.state.publication.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form style={{margin: "10px"}} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="avatar" >
                        <Form.Label>Images  {this.state.uploadingActive && <Loader />} </Form.Label>
                        <Form.Control type="file" name="avatar" onChange={this.handleImageUpload} />
                    </Form.Group>
                    <Button className="float-right" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading...' : 'Edit profile'}</Button>
                </Form>
                
                    <Button className="float-right" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading...' : 'Edit profile'}</Button>
            </Form> */}
        </>
        
        )
    }
}




