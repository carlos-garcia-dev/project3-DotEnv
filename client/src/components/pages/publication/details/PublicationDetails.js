import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'


import Loader from '../../../shared/loader/Loader.js'

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

    
    deletePublication = () => {
        this.servicePublication
            .deletePublication()
            .then(res => this.setState({ publications: res.data }))
            .catch(err => console.log(err))
    }





    render() {
        return (
            <Container>  

                { this.state.publications
                    ?
                    <>
                        <Row>
                            <Col>
                                <h1 className="page-title">Entries</h1>
                                
                                <h1 className="page-title">{this.state.publications.title}</h1>
                            
                                <Link><h4 className="float-right">{this.state.publications.tag}</h4></Link>
                            </Col>
                        </Row>
                        

                        <h3 className="entries-subTitle">{this.state.publications.subTitle}</h3>

                        
                        <figure>
                            <img src={this.state.publications.imageUrl} alt={this.state.publications.title} className="entries-main" />
                        </figure>
                        
             
                        <p className="position-right">{this.state.publications.subTitle}</p>
                        <p className="entries-bodyText">{this.state.publications.bodyText}</p>
                    

                            <h4>{this.state.publications.createdAt}</h4>
                  
                            <Col>
                                <img style={{ width: "100px", height: "100px" }} src={this.state.publications.author.avatar} alt={this.state.publications.author.username} className={"float-right"} /> 
                                <Link className="float-right"> <h4>{this.state.publications.author.username}</h4></Link>
                            </Col>
               
                         
                        
                        { this.props.signnedUser && <Link onClick={this.deletePublication}><Button className="float-right rounded-0" variant="dark">Delete</Button></Link> }
                
                        
                        <Row>
                            <CommentaryForm signnedUser={this.props.signnedUser} storeUser={this.props.storeUser} updateCommentList={this.reloadComments} publicationId={this.state.publications._id} />
                        </Row>

                        { this.state.publications.commentaries.reverse().map(elm =>
                            <Row key={elm._id}>
                                <CommentaryCard signnedUser={this.props.signnedUser} {...elm} />
                            </Row>)
                        }   
                    </>
                    : 
                    <Loader />}
            
            </Container>
        ) 
    }
}

