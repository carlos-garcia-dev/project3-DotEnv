import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'




//LINKS
import UserSignIn from './pages/userSignIn/UserSignIn'
import UserSignUp from './pages/userSignUp/UserSignUp'


//COMPONENTS
import Navigation from './layout/navBar/NavBar'
import FootBar from './layout/footBar/FootBar'

import PublicationList from './pages/publicationList/PublicationList'
import PublicationDetails from './pages/publicationDetails/PublicationDetails'


//SERVICES
import AuthService from './../service/auth.service'



class App extends Component {
  
  constructor() {
    super()
      this.state = { signnedUser: undefined }
      this.serviceAuth = new AuthService()
  }

  componentDidMount = () => {

    this.serviceAuth
      .signnedIn()
      .then(response => this.setStateUser(response.data))
      .catch(err => this.setStateUser(undefined))
  }

  setStateUser = user => this.setState({ signnedUser: user }, () => console.log('NEW APP STATE:', this.state))

  
render(){
  
  return (

    <>
      <Navigation />
      
      <main>

        <Switch>
           {/* PAGES */}
          <Route path="/" exact render={ () => <PublicationList currentUser={this.state.signnedUser} />} />
          <Route path="/entries" render={ () => <PublicationList currentUser={this.state.signnedUser} />} />
          <Route path="/entries/:publication_id" render={ props => <PublicationDetails {...props} />} />
          
          
          
          
          {/* AUTH */}
          <Route path="/signup" render={ props => <UserSignUp storedUser={this.setStateUser} {...props} />} />
          <Route path="/signin" render={ props => <UserSignIn storedUser={ this.setStateUser } {...props} />} />
          <Route path="/signout" render={ props => <UserSignIn storedUser={this.setStateUser} {...props} />} />
        </Switch>
      
      </main>

      <FootBar />
      
    </>

    )
  }
}

export default App;
