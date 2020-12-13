import React from 'react'
// import { Link } from 'react-router-dom'
// import { Container, Row, Col } from 'react-bootstrap'


const CommentaryCard = ({title, bodyText, author}) => {
    
    return (
        <>
            <h4>Commentary Card</h4>
            <h6>{title}</h6>
            <p>{bodyText}</p>
            <small>{author}</small>
        </>
    )
}

export default CommentaryCard