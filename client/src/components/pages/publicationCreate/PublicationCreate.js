import React, { Component } from 'react'


import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PublicationService from '../../../service/publication.service'

class NewPublication extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            subTitle: '',
            bodyText: '',
            imageUrl: '',
            tag: '',
            author: this.props.signnedUser, 
            commentaries: []
        }

        this.servicePublication = new PublicationService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.servicePublication
            .postNewPublication(this.state)
            .then(signnedUser => {
                this.props.storedUser(signnedUser.data)
                this.props.history.push('/')       
            })
            .catch(err => console.log({ err }))
    }


    render() {

        return (

            <Container>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <br></br>
                        <br></br>
                      
                      
                        <h1>New entry</h1>

                        <br></br>
           

                        <Form onSubmit={this.handleSubmit}>
                            
                            <Form.Group controlId="name">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="name" placeholder='Title' value={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>
                            
                            <Form.Group controlId="subtitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="text" name="subtitle" placeholder='Subtitle' value={this.state.subTitle} onChange={this.handleInputChange} />
                            </Form.Group>
                   
                            <Form.Group controlId="body">
                                <Form.Label>Body</Form.Label>
                                <Form.Control type="text" name="body" placeholder='Write your post here ...' value={this.state.bodyText} onChange={this.handleInputChange} />
                                <Form.Control/> <textarea name="textarea" rows="10" cols="50">Write your post here ...</textarea>
                            
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Images</Form.Label>
                                <Form.Control type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="tag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="dropdown" name="tag" placeholder='Password' value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            
                            <Button variant="dark" type="submit">Post</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewPublication