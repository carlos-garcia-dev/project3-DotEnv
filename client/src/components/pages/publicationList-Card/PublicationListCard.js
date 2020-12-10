import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const PublicationListCard = ({ _id, title, subTitle, imageUrl, tag,  author, signnedUser }) => {
    return (
        <Col lg={6}>
            <Card className="publication-card">
                
                
                <Card.Img variant="top" src={imageUrl} />

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{subTitle}</Card.Subtitle>
                    <Card.Link>{tag}</Card.Link>
   

                </Card.Body>
            </Card>
        </Col>
    )
}

export default PublicationListCard