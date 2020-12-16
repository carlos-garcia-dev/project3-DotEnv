import React, { Component } from 'react'
import { Container, Form } from 'react-bootstrap'

import Loader from '../../../shared/loader/Loader'

import PublicationListCard from '../../publication/list/PublicationListCard'


import ServicePublication from '../../../../service/publication.service'
import ServiceFile from '../../../../service/file.service'


export default class UserProfile extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            user: {

                title: '',
                subTitle: '',
                bodyText: '',
                imageUrl: '',
                tag: '',
                commentaries: []
            },
                uploadingActive: false
    }
        this.servicePublication = new ServicePublication()
        this.serviceFiles = new ServiceFile()
    }

    
    handleInputChange = e => this.setState({ publication: { ...this.state.publication, [e.target.name]: e.target.value }})


    handleSubmit = e => {
        e.preventDefault()

        this.servicePublication
            .uploadAvatar(this.state.publication)
            .then(signnedUser => {
                this.props.storeUser(signnedUser.data)
                this.props.history.push('/')})
            .catch(err => console.log({err}))
    }


    handleImageUpload = e => {
        const uploadData = new FormData()

        uploadData.append('imageUrl', e.target.files[0])

        // e.target.files.size >= 4000 ? e.target.files. : <Alert></Alert>

        this.setState({ uploadingActive: true })


        this.serviceFiles
            .uploadImage(uploadData)
            .then(response => this.setState({
                publication: { ...this.state.publication, imageUrl: response.data.secure_url },
                uploadingActive: false }))
            .catch(err => console.log('ERROR:', err))
    }






    render() {
        return (
            
            <Container>
                
                <h1 className="page-title">Profile</h1>
            
                {/* <img src={{this.siggnedUser.avatar}} alt="Hola"/> */}
                

                <Form style={{margin: "10px"}} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="imageUrl" >
                        <Form.Label>Images  {this.state.uploadingActive && <Loader />} </Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={this.handleImageUpload} />
                    </Form.Group>
                </Form>

            <PublicationListCard />
                {/* {this.state.map.publications} */}

            </Container>
            
        
        
        
        ) 
    }
}