import React, { Component } from 'react'

import { Container } from 'react-bootstrap'

import Loader from '../../shared/loader/Loader'


import PublicationService from '../../../service/publication.service'


class PublicationDetails extends Component {
   
    constructor() {
        super()
        this.state = {
            publications: undefined
        }
        this.servicePublication = new PublicationService()
    }
    
    componentDidMount = () => {
        
        const publication_id = this.props.match.params.publication_id
  
        this.servicePublication
        .getOnePublication(publication_id)
        .then(res => this.setState({ publications: res.data }))
        .catch(err => console.log(err)) 
    }



    render() {
        return (
            <Container>
                
                {this.state.publications
                    ?
                    <>
                      

                        <br></br>
                        <br></br>

                        <h1>Entries</h1>
                        <br></br>
                      
                        <h2>{this.state.publications.title}</h2>
                        <h4>{this.state.publications.subTitle}</h4>

                        <section>
                            <img src={this.state.publications.imageUrl} alt={this.state.publications.title} />
                            <br></br>
                            <br></br>
                            <p> {this.state.publications.bodyText} </p>
                            <h5> {this.state.publications.tag} </h5>
                            <h6> {this.state.publications.createdAt} </h6>

                        </section>
                
                    </>
                    :
                    <Loader />
                }

            
            
            </Container>

        ) 
    }
}

export default PublicationDetails