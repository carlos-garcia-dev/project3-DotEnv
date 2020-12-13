import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'


import Loader from '../../shared/loader/Loader'

import CommentaryCard from '../commentaryCard/CommentaryCard'

import PublicationService from '../../../service/publication.service'
import CommentaryService from '../../../service/commentary.service'


export default class PublicationDetails extends Component {
   
    constructor() {
     super()
        this.state = { publications: undefined, commentaries: [] }
        this.servicePublication = new PublicationService()
        this.serviceCommentary = new CommentaryService()
    }
    
    componentDidMount = () => {
        const publication_id = this.props.match.params.publication_id
  
        this.servicePublication
            .getOnePublication(publication_id)
            .then(res => this.setState({ publications: res.data }))
            .catch(err => console.log(err)) 
    }

    // putPublication = () => {
    //     this.serviceAuth
    //         .signnedIn()
    //         .then()
    //         .catch(err => console.log(err))
    // }

    // postNewCommentary = () => {
    //     this.serviceCommentary
    //         .create()
    //         .then()
    //         .catch(err => console.log(err)) 
    // }

    // putCommentary = () => {
    //     this.serviceAuth
    //         .signnedIn()
    //         .then()
    //         .catch(err => console.log(err))
    // }




    render() {
        return (
            <Container>
                
                {this.state.publications
                    ?
                    <>
                        <Row><Col><h1 className="page-title">Entries</h1><Link><h4 className="float-right">{this.state.publications.tag}</h4></Link></Col></Row>
                        
                        <h1>{this.state.publications.title}</h1>

                        <figure><img src="https://64.media.tumblr.com/09c6afa2d3bf83d804e8b6df77b9ab26/tumblr_psv9cqSmgY1vgxm5f_1280.jpg" alt={this.state.publications.title} className="entries-main"/></figure>
                        {/* <img src={this.state.publications.imageUrl} alt={this.state.publications.title} /> */}
                        <small className="float-right">{this.state.publications.subTitle}</small>
                        <h4 className="entries-subTitle">{this.state.publications.subTitle}</h4>
            
                        <p>{this.state.publications.bodyText}</p>
                    
                        <Row><Link ><h4>{this.state.publications.createdAt}</h4></Link><Link className="float-right"><h4>{this.state.publications.author._id}</h4></Link></Row>                
                    </>
                    :
                    <Loader />}

                
                {this.props.signnedUser
                    ?
                    <Link onClick={this.putPublication}>Editar</Link>
                    :
                    undefined}
                

                <CommentaryCard/>
            
            </Container>
        ) 
    }
}

