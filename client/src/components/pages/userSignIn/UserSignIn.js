import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class SignIn extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
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
                this.props.history.push('/')        // redirección JS ?
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
                      
                      
                        <h1>Sign In</h1>

                        <br></br>


                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder='Username' value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button className="float-right" variant="dark" type="submit">Sign in</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SignIn