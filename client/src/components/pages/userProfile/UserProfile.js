import React, { Component } from 'react'
import PublicationService from '../../../service/publication.service'
import { Container, Col, Row } from 'react-bootstrap'


import Loader from '../../shared/loader/Loader'


class UserProfile extends Component {
   
    constructor() {
        super()
        this.state = {
            publications: []
        }
        this.servicePublication = new PublicationService()
    }

    componentDidMount = () => this.reloadSavedEntries()

   

    render() {
        
        return (
            
            <Container>
                <Col>
                    <br/>
                    <br/>
                    <h1>Profile</h1>
                    <br/>
                <Row></Row>
                
                </Col>

            </Container>
        ) 
    }
}

export default UserProfile