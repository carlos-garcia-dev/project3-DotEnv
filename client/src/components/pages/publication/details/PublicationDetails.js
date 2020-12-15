import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'


import Loader from '../../../shared/loader/Loader'

import CommentaryCard from '../../commentary/card/CommentaryCard'
import CommentaryForm from '../../commentary/form/CommentaryForm'

import ServicePublication from '../../../../service/publication.service'
import ServiceCommentary from '../../../../service/commentary.service'


export default class PublicationDetails extends Component {
   
    constructor() {
        super()
            this.state = { publications: undefined, commentaries: [] }
            this.servicePublication = new ServicePublication()
            this.serviceCommentary = new ServiceCommentary()
    }
    

    componentDidMount = () => {
        const publication_id = this.props.match.params.publication_id
  
        this.servicePublication
            .getOnePublication(publication_id)
            .then(res => this.setState({ publications: res.data, commentaries: res.data.commentaries}))
            .catch(err => console.log(err)) 
    }
    

    reloadPublications = () => {
        this.servicePublication
            .getCommentaries()
            .then(res => this.setState({ commentaries: res.data }))
            .catch(err => console.log(err))
    }

    
    reloadComments = () => {
        this.servicePublication
            .getAllPublicationComments(this.state.publications._id)
            .then(res => {
                
                const publicationsCopy = { ...this.state.publications }

                publicationsCopy.commentaries = res.data
                this.setState({publications: publicationsCopy})})
            .catch(err => console.log(err))
    }




    render() {
            console.log(this.state.publications)
        return (
            <Container>
                

                {this.state.publications
                    ?

                    <>
                        <Row>
                            <Col>
                                <h1 className="page-title">Entries</h1>
                                <Link><h4 className="float-right">{this.state.publications.tag}</h4></Link>
                            </Col>
                        </Row>
                        

                        <h3 className="entries-subTitle">{this.state.publications.subTitle}</h3>

                        
                        <figure>
                            <img src={this.state.publications.imageUrl} alt={this.state.publications.title} className="entries-main" />
                        </figure>
                        
             
                        <p className="position-right">{this.state.publications.subTitle}</p>
                        <p className="entries-bodyText">{this.state.publications.bodyText}</p>
                    

                        <Row>
                            <Col>
                                <Link ><h4>{this.state.publications.createdAt}</h4></Link>
                                <Link className="float-right"> <h4>{this.state.publications.author._id}</h4></Link>
                            </Col>
                        </Row>
                         
                        
                        {this.props.signnedUser && <Link onClick={this.putPublication}>Edit</Link>}
                
                        
                        <Row>
                            <CommentaryForm signnedUser={this.props.signnedUser} storedUser={this.props.storedUser} updateCommentList={this.reloadComments} publicationId={this.state.publications._id} />
                        </Row>

                        {this.state.publications.commentaries.reverse().map(elm =>
                            <Row key={elm._id}>
                                <CommentaryCard signnedUser={this.props.signnedUser} {...elm} />
                            </Row>)}   
                    </>

                    : 
                    <Loader />}
            
            </Container>
        ) 
    }
}

