import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Form, Button } from 'react-bootstrap'


import ServiceCommentary from '../../../../service/commentary.service'


export default class CommentaryForm extends Component {

    constructor(props) {
        super(props)
            this.state = {
                title: '',
                bodyText: '',
                author: this.props.signnedUser ? this.props.signnedUser._id : undefined,
                publicationId: this.props.publicationId
            }
        this.serviceCommentary = new ServiceCommentary()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {
        e.preventDefault()

        this.serviceCommentary
            .postNewCommentary(this.state)
            .then(response => {
                this.props.storeUser(response.data[1])
                this.props.updateCommentList()
            })
            
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
                    <Form.Control  as="textarea" type="text" name="bodyText"  rows="4" placeholder='Your commentaries...' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>


                { this.state.author === undefined
                    ?
                    <Link to="/becomeUser"><Button className="float-right rounded-0" variant="dark">Register</Button></Link>
                    :
                    <Button className="float-right rounded-0" variant="dark" type="submit" onClick={this.postNewCommentary}>Comment</Button>}
               
            </Form>
        </Col>
        )
    }
}

