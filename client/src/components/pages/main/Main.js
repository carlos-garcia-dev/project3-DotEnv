import React, {Component} from 'react'
import { Container } from 'react-bootstrap'


// import Loader from '../../shared/loader/Loader'


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
                
            </Container>
        )
    }
}
