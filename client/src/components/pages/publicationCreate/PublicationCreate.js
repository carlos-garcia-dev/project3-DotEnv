import React, { Component } from 'react'


import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap'
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
                    <Col md={{ span: 8, offset: 3 }}>

                        <h1 className="page-title">New entry</h1>

                        <br></br>
           

                        <Form onSubmit={this.handleSubmit}>
                            
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder='Title' value={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>
                            
                            <Form.Group controlId="subTitle">
                                <Form.Label>Subtitle</Form.Label>
                                <Form.Control type="text" name="subTitle" placeholder='Subtitle' value={this.state.subTitle} onChange={this.handleInputChange} />
                            </Form.Group>
                   
                            <Form.Group controlId="body">
                                <Form.Label>Entry</Form.Label>
                                <Form.Control type="textarea" name="bodyText"  rows="10" cols="50" placeholder="Write your new entry here ..." value={this.state.bodyText} onChange={this.handleInputChange} />
                             </Form.Group>

                            <Form.Group controlId="imageUrl" >
                                <Form.Label>Images</Form.Label>
                                <Form.File type="imageUrl" name="imageUrl" placeholder='imageUrl' value={this.state.imageUrl} onChange={this.handleInputChange} />
                            </Form.Group>
                            
                            <Form.Group controlId="tag" type="dropdown" name="tag" placeholder='Select the category' value={this.state.password} onChange={this.handleInputChange}>
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




                            <Button className="float-right" variant="dark" type="submit">Post</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewPublication