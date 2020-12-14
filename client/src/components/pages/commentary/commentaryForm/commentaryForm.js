import React, { Component } from 'react'
import AuthService from '../../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            bodyText: '',
            author: this.props.signnedUser ? this.props.signnedUser._id : '',
        }
        this.serviceAuth = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.serviceAuth
            .signIn(this.state)
            .then(signnedUser => {
                this.props.storedUser(signnedUser.data)
                this.props.history.push('/')})
            .catch(err => console.log({err}))
    }


    render() {

        return (

            <Container>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
            
                        <h1 className="page-title">Sign In</h1>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder='Title' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="title">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control type="text" name="bodyText" placeholder='Your commentaries...' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button className="float-right rounded-0" variant="dark" type="submit">Comment</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}