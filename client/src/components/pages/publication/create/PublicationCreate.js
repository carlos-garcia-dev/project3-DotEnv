import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Loader from '../../../shared/loader/Loader'


import ServicePublication from '../../../../service/publication.service'
import ServiceFile from '../../../../service/file.service'


export default class NewPublication extends Component {

    constructor(props) {
        super(props)
            this.state = {

                publication: {
                    title: '',
                    subTitle: '',
                    bodyText: '',
                    imageUrl: '',
                    tag:'',
                    author: this.props.signnedUser._id,
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

        console.log(this.state.publication)
        this.servicePublication
            .postNewPublication(this.state.publication)
            .then(signnedUser => {
                this.props.storeUser(signnedUser.data)
                this.props.history.push(`/entries/${signnedUser.data.publications[signnedUser.data.publications.length - 1]}`)})
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
    return(
            <Container>

                <Row>
                    <Col md={{ span: 8, offset: 3 }}>

                        <h1 className="page-title">New entry</h1>

                        <Form style={{margin: "10px"}} onSubmit={this.handleSubmit}>
                            
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" size="lg" name="title" placeholder='Title' value={this.state.publication.title} onChange={this.handleInputChange} />
                            </Form.Group>
                            
                            <Form.Group controlId="subTitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="text" name="subTitle" placeholder='Subtitle' value={this.state.publication.subTitle} onChange={this.handleInputChange} />
                            </Form.Group>
                   
                            <Form.Group controlId="body">
                                <Form.Label>Entry</Form.Label>
                                <Form.Control as="textarea" type="text" name="bodyText"  rows="10" cols="50" placeholder="Write your new entry here ..." value={this.state.publication.bodyText} onChange={this.handleInputChange} />
                             </Form.Group>

                            <Form.Group controlId="imageUrl" >
                                <Form.Label>Images  {this.state.uploadingActive && <Loader />} </Form.Label>
                                <Form.Control type="file" name="imageUrl" onChange={this.handleImageUpload} />
                            </Form.Group>
                            
                            <Form.Group controlId="tag">
                                <Form.Label>Tag</Form.Label>
                            
                                <Form.Control as="select" name="tag" value={this.state.publication.tag} onChange={this.handleInputChange}>
                                    <option value="Web design">Web design</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Data analytics">Data analytics</option>
                                    <option value="Digital marketing">Digital marketing</option>
                                    <option value="UX / UI design">UX / UI design</option>
                                    <option value="Dev tools">Dev tools</option>
                                </Form.Control>
                            </Form.Group>

                            
                            <Button className="float-right" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Uploading...' : 'Create entry'}</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

