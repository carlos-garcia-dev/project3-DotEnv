import React, { Component } from 'react'
import { Col, Form, Button } from 'react-bootstrap'


import ServiceCommentary from '../../../../service/commentary.service'


export default class CommentaryForm extends Component {

    constructor(props) {
        super(props)
            this.state = {
                title: '',
                bodyText: '',
                author: this.props.signnedUser._id ? this.props.signnedUser._id : undefined,
                publicationId: this.props.publicationId
            }
        this.serviceCommentary = new ServiceCommentary()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {
        e.preventDefault()

        this.serviceCommentary
            .postNewCommentary(this.state)
            .then(response => {this.props.storedUser(response.data[1])})
            .catch(err => console.log({ err }))
    }



    
    render() {
    return (
        <Col> 
           
            <h4 className="page-title">Write your Commentary</h4>
           
            <Form onSubmit={this.handleSubmit} >
                <Form.Group controlId="title" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder='Title' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" name="bodyText" placeholder='Your commentaries...' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>
                <Button className="float-right rounded-0" variant="dark" type="submit" onClick={this.postNewCommentary}>Comment</Button>
           
            </Form>
        </Col>
    )}
}

