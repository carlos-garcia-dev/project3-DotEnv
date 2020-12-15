import { Col, Card, Row, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const PublicationListCard = ({ _id, title, subTitle, imageUrl, tag }) => {
    
    return (

        <Col lg={6} md={8}>
            <Row className="align-self-center mr-3">
                <Media style={{ height: "10rem", width:"30rem", border:"1px solid black", margin:"1rem", padding:"1.5rem"}}>
                        <img
                            width={100}
                            height={100}
                            className="entry-image"
                            src={imageUrl}
                            alt={title}
                        />
                    <Media.Body style={{ height: '200px' }}>
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



        // <Col lg={6}>
        //     <Card className="publication-card">
        //         <Row>
        //             <Col md={2}> <Card.Img style={{ height: '100px' }} src={imageUrl} /> </Col>

        //              <Col>       
        //                 <Card.Body style={{ height: '200px' }}>
        //                     <Card.Title><Link to={`/entries/${_id}`}>{title}</Link></Card.Title>
        //                     <Card.Subtitle>{subTitle}</Card.Subtitle>
        //                     <Card.Link>{tag}</Card.Link>
        //                 </Card.Body>
        //             </Col>
        //         </Row>
        //     </Card>
                    
        //     <br></br>
        // </Col>