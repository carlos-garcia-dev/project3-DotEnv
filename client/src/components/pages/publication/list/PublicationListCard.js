import { Col, Card, Row, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import  './PublicationListCard.css'


const PublicationListCard = ({ _id, title, subTitle, imageUrl, tag }) => {
    
    return (

        <Col lg={6} md={12}>
            <Row className="align-self-center mr-3">
                <Media style={{ height: "10rem", width:"30rem", border:"1px solid black", margin:"1rem", padding:"1.5rem"}}>
                        <img
                            width={100}
                            height={100}
                            className="entry-image"
                            src={imageUrl}
                            alt={title}
                        />
                    <Media.Body style={{ height: '200px', paddingLeft:'1.5rem'}}>
                        <Card.Title><Link to={`/entries/${_id}`}>{title}</Link></Card.Title>
                        <Card.Subtitle>{subTitle}</Card.Subtitle>
                        <Card.Link >{tag}</Card.Link>
                        <Card.Link className="float-right">{tag}</Card.Link>    
                    </Media.Body>
                </Media>
            </Row>   
        </Col>
    )
}

export default PublicationListCard
