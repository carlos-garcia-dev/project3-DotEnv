import React, { Component } from 'react'

import { Container, Row, Col, Form, Button, Dropdown, Toast } from 'react-bootstrap'

import Loader from '../../../shared/loader/Loader'


import PublicationService from '../../../../service/publication.service'
import FileService from '../../../../service/file.service'


export default class NewPublication extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
            publication: {
                title: '',
                subTitle: '',
                bodyText: '',
                imageUrl: '',
                tag: '',
                author: this.props.signnedUser ? this.props.signnedUser._id : '',
                commentaries: []
            },
                uploadingActive: false
        }
        this.servicePublication = new PublicationService()
        this.serviceFiles = new FileService()
    }


    handleInputChange = e => this.setState({ publication: { ...this.state.publication, [e.target.name]: e.target.value }})


    handleSubmit = e => {
        e.preventDefault()

        this.servicePublication
            .postNewPublication(this.state.publication)
            .then(signnedUser => {
                this.props.currentUser(signnedUser.data)
                this.props.history.push('/')})
            .catch(err => console.log({err}))
    }


    handleImageUpload = e => {
        const uploadData = new FormData()

        uploadData.append('imageUrl', e.target.files[0])

        // e.target.files.size >= 4 ? 

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

                <Row>
                    <Col md={{ span: 8, offset: 3 }}>

                        <h1 className="page-title">New entry</h1>

                        <Form style={{margin: "10px"}} onSubmit={this.handleSubmit}>
                            
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder='Title' value={this.state.publication.title} onChange={this.handleInputChange} />
                            </Form.Group>
                            
                            <Form.Group controlId="subTitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="text" name="subTitle" placeholder='Subtitle' value={this.state.publication.subTitle} onChange={this.handleInputChange} />
                            </Form.Group>
                   
                            <Form.Group controlId="body">
                                <Form.Label>Entry</Form.Label>
                                <Form.Control type="textarea" name="bodyText"  rows="10" cols="50" placeholder="Write your new entry here ..." value={this.state.publication.bodyText} onChange={this.handleInputChange} />
                             </Form.Group>

                            <Form.Group controlId="imageUrl" >
                                <Form.Label>Images  {this.state.uploadingActive && <Loader />} </Form.Label>
                                <Form.Control type="file" name="imageUrl" onChange={this.handleImageUpload} />
                            </Form.Group>
                            
                            <Form.Group controlId="tag" type="dropdown" name="tag" placeholder='Select the category' onChange={this.handleInputChange}>
                                <Form.Label>Tag</Form.Label>
                            
                                <Dropdown>
                                  <Dropdown.Toggle className="btn-block" id="dropdown-basic">Select one Tag</Dropdown.Toggle>
                                        
                                  <Dropdown.Menu className="btn-block">
                                    <Dropdown.Item href="#/action-1">Web design</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Cybersecurity</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Data analytics</Dropdown.Item>
                                    <Dropdown.Item href="#/action-4">Digital marketing</Dropdown.Item>
                                    <Dropdown.Item href="#/action-5">UX / UI Design</Dropdown.Item>
                                    <Dropdown.Item href="#/action-6">Developement tools</Dropdown.Item>                              
                                  </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        
                        {/* 

                            <ButtonGroup className="mb-2">
                              <Button>Web design</Button>
                              <Button>Cybersecurity</Button>
                              <Button>Data analytics</Button>
                            </ButtonGroup>

                            <ButtonGroup className="mb-2">
                              <Button>Digital marketing</Button>
                              <Button>UX / UI Design</Button>
                              <Button>Developement tools</Button>
                            </ButtonGroup> */}

                            
                            <Button className="float-right" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading...' : 'Create entry'}</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

