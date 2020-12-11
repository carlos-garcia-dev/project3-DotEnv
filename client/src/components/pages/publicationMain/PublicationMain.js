import React, {Component} from 'react'
import { Container } from 'react-bootstrap'


import Loader from '../../shared/loader/Loader'


class Main extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined,
        }
    }


    render() {
       
        return (

            <Container>

                <>
                    <br></br>
                    <br></br>
                    <h1>Main</h1>
                    <br></br>
                </>
            



            </Container>
        )
    }
}

export default Main