import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap'


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
    return(
            <Container>
                
                <h1 className="page-title">Publications</h1>
                
                <Row style={{paddingLeft: "18px"}}>
                    { this.props.currentUser !== undefined && <Link to='/new'><Button className="float-right rounded-0" variant="dark">Create</Button></Link> }
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
