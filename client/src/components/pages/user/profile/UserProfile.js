import React, { Component } from 'react'
import { Container } from 'react-bootstrap'


import ServicePublication from '../../../../service/publication.service'

export default class UserProfile extends Component {
   
    constructor() {
        super()
            this.state = { publications: [] }
        this.servicePublication = new ServicePublication()
    }

    // componentDidMount = () => this.reloadSavedEntries()

   
    render() {
        return (
            
            <Container> <h1 className="page-title">Profile</h1> </Container>
        ) 
    }
}