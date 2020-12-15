import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'


import Loader from '../../../shared/loader/Loader'


import PublicationListCard from './PublicationListCard'


import PublicationService from '../../../../service/publication.service'


export default class PublicationList extends Component {
   
    constructor() {
        super()
            this.state = { publications: [] }
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
                
                <h1 className="page-title">Publications</h1>
                
                <Row>
                {/* {this.state.siggnedUser */}

                </Row>
                
                <Row>
                    { this.state.publications
                            ?
                        this.state.publications.map(elm => <PublicationListCard key={elm._id} {...elm} />)
                            :
                            <Loader /> }
                </Row>
                
            </Container>
        ) 
    }
}
