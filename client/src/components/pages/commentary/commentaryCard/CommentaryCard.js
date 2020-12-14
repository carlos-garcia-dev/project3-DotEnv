import React from 'react'
// import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'


const CommentaryCard = ({ title, bodyText, author, updateList }) => {
    
    return (

        <Container>
            <h6>{title}</h6>
            <p>{bodyText}</p>
            <small>{author}</small>
        </Container> 
    )
}

export default CommentaryCard