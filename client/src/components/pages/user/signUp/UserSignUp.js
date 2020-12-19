import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



import ServiceAuth from '../../../../service/auth.service'



export default class UserSignUp extends Component {

    constructor() {
        super()
            this.state = {
                name:'',
                username: '',
                email: '',
                password: '',
            }
        this.serviceAuth = new ServiceAuth()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {
        e.preventDefault()

        this.serviceAuth
            .signUp(this.state)
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
                
                    <h1 className="page-title">Sign Up</h1>

                    <Form onSubmit={this.handleSubmit}>
                    
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder='Name' className="rounded-0" value={this.state.name} onChange={this.handleInputChange} />
                        </Form.Group>
                    
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder='Username' className="rounded-0" value={this.state.username} onChange={this.handleInputChange} />
                        </Form.Group>
           
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" placeholder='Email' className="rounded-0" value={this.state.email} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder='Password' className="rounded-0" value={this.state.password} onChange={this.handleInputChange} />
                        </Form.Group>
                    
                        <Button className="float-right rounded-0" variant="dark" type="submit">Sign up</Button>
        
                    </Form>
                </Col>
            </Row>
        </Container>
        )
    }  
}