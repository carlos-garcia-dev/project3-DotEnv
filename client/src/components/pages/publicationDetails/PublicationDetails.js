import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'




import PublicationService from '../../../service/publication.service'


class PublicationDetails extends Component {
   
    constructor() {
        super()
        this.state = {
            publications: []
        }
        this.servicePublication = new PublicationService()
    }

    componentDidMount = () => {

        this.servicePublication
            .getPublications()
            .then(res => this.setState({ publications: res.data }))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Container>
                <h2>Publications</h2>
                <Row>{this.state.publications.map(elm => <Col key={elm._id}><h5>{elm.title}</h5></Col>)}</Row>
            </Container>

        ) 
    }
}

export default PublicationDetails