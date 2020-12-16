import React, {Component} from 'react'
import { Container, Carousel } from 'react-bootstrap'


export default class Main extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined,
        }
    }


    render() {
       
        return (

            <Container>
                
                <h1 className="page-title">Main</h1>

                <Carousel>
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/manager00/image/upload/v1608110239/Project3/Carousel/post._crtugv.png"
                        alt="First slide"
                      />
                        <Carousel.Caption >
                        <h3 style={{ color: "black" }}  >First slide label</h3>
                        <p style={{ color: "black" }}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>

                    
                    <Carousel.Item interval={500}>
                      <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/manager00/image/upload/v1608110239/Project3/Carousel/post._crtugv.png"
                        alt="Third slide"
                      />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>

                    
                    <Carousel.Item>
                        <img  className="d-block w-100"
                              src="https://res.cloudinary.com/manager00/image/upload/v1608110239/Project3/Carousel/post._crtugv.png"
                              alt="Third slide"/>
                      <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
            </Carousel>
            
            <section>

              <h3 className="page-title">Most recent posts</h3>


        
              



            </section>

            </Container>
        )
    }
}
