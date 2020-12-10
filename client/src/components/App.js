import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


import ListPublications from './pages/list-Publications/List-Publications'


//LINKS
import SignIn from './pages/signIn-User/SignIn'
import SignUp from './pages/signUp-User/SignUp'


//COMPONENTS
import Navigation from './layout/navBar/NavBar'
import FootBar from './layout/footBar/FootBar'


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
           {/* APP */}
          <Route path="/" exact render={ () => <ListPublications currentUser={this.state.signnedUser} />} />
          <Route path="/entries" render={ () => <ListPublications currentUser={this.state.signnedUser} />} />
          
          
          
          
          {/* AUTH */}
          <Route path="/signup" render={ props => <SignUp storedUser={this.setStateUser} {...props} />} />
          <Route path="/signin" render={ props => <SignIn storedUser={ this.setStateUser } {...props} />} />
          <Route path="/signout" render={ props => <SignIn storedUser={this.setStateUser} {...props} />} />
          
        </Switch>
      
      </main>

      <FootBar />
      
    </>

    )
  }
}

export default App;
