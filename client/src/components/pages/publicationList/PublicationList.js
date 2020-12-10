import React, { Component } from 'react'
import PublicationService from '../../../service/publication.service'
import { Container, Row } from 'react-bootstrap'


import Loader from '../../shared/loader/Loader'

import PublicationListCard from '../publicationList-Card/PublicationListCard'





class PublicationList extends Component {
   
    constructor() {
        super()
        this.state = {
            publications: []
        }
        this.servicePublication = new PublicationService()
    }

    componentDidMount = () => this.reloadPublications()


    reloadPublications = () => {

        this.servicePublication
            .getPublications()
            .then(res => this.setState({ publications: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>

                <br></br>    
                <br></br>    
            
                <h1>Publications</h1>
                
                <Row>
                    { this.state.publications
                            ?
                            this.state.publications.map(elm => <PublicationListCard key={ elm._id } { ...elm } />)
                            :
                            <Loader /> }
                </Row>
            </Container>
        ) 
    }
}

export default PublicationList