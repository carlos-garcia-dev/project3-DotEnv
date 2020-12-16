/* eslint-disable no-lone-blocks */
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap'


const CommentaryCard = ({ title, bodyText, author }) => {
    
    return (
        <Container>
            
            {/* {this.state.author !== this.props.siggnedUser || <Link><Button className="rounded-0 float-right" variant="dark">Delete</Button></Link> }  */}

            <h4>{title}</h4>
            <p>{bodyText}</p>
            <Row className="float-right"><small>{author}</small></Row>
        </Container> 
    )
}

export default CommentaryCard



 {/* {author && <Link><Button className="rounded-0 float-right" variant="dark">Edit</Button></Link>} */}
 {/* { this.props.siggnedUser._id === author && <Link><Button className="rounded-0 float-right" variant="dark">Delete</Button></Link>} */}   
 {/* {this.signnedUser._id && <Link><Button className="rounded-0 float-right" variant="dark">Delete</Button></Link>} */}