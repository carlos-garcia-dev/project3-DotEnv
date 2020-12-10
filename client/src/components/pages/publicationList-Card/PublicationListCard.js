import { Col, Card, Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const PublicationListCard = ({ _id, title, subTitle, imageUrl, tag }) => {
    
    return (

        <Col lg={6}>
            <Card className="publication-card">
                <Row>
                <Col md={2}>
                    <Card.Img style={{ backgroundColor: 'red' }, { height: '100px' }} src={imageUrl} />
                </Col>

                <Col>       
                        <Card.Body style={{ height: '200px' }}>
                            <Card.Title><Link to={`/entries/${_id}`}>{title}</Link></Card.Title>
                            <Card.Subtitle>{subTitle}</Card.Subtitle>
                            <Card.Link>{tag}</Card.Link>
                    </Card.Body>
                    </Col>
                </Row>
            </Card>
                    
            <br></br>

        </Col>
    )
}

export default PublicationListCard