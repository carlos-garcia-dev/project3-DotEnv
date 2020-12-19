import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



import ServiceAuth from '../../../../service/auth.service'


export default class SignIn extends Component {

    constructor(props) {
        super(props)
            this.state = {
                username: '',
                password: ''
            }
        this.serviceAuth = new ServiceAuth()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    
    handleSubmit = e => {
        e.preventDefault()

        this.serviceAuth
            .signIn(this.state)
            .then(signnedUser => {
                this.props.storeUser(signnedUser.data)
                this.props.history.push('/profile')})
            .catch(err => console.log('NEW ERROR:', err))
    }


    render() {
    return (

            <Container>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
            
                        <h1 className="page-title">Sign In</h1>
                        
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder='Username' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder='Password' className="rounded-0" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button className="float-right rounded-0" variant="dark" type="submit">Sign in</Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        )
    }
}