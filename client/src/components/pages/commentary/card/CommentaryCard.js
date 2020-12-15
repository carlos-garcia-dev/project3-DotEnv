import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'


const CommentaryCard = ({ title, bodyText, author }) => {
    
    return (
        <Container>
        
        
            {this.props.signnedUser
                ?
                <>
                <Link onClick={this.putPublication}><Button className="rounded-0" variant="dark">Edit</Button></Link>
                <Link onClick={this.putPublication}><Button className="rounded-0 float-right" variant="dark">Delete</Button></Link>
                </>
                :
                undefined}
                   


                
            <h6>{title}</h6>
            <p>{bodyText}</p>
            <small>{author}</small>
        </Container> 
    )
}

export default CommentaryCard