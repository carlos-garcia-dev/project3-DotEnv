import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'



import Navigation from './layout/navBar/NavBar'
import FootBar from './layout/footBar/FootBar'


import About from './pages/about/About'
import BecomeUser from './pages/becomeUser/BecomeUser'


import PublicationMain from './pages/main/Main'
import PublicationList from './pages/publication/publicationList/PublicationList'
import PublicationDetails from './pages/publication/publicationDetails/PublicationDetails'
import PublicationCreate from './pages/publication/publicationCreate/PublicationCreate'


import UserSignIn from './pages/user/userSignIn/UserSignIn'
import UserSignUp from './pages/user/userSignUp/UserSignUp'
import UserProfile from './pages/user/userProfile/UserProfile'


import AuthService from '../service/auth.service'




export default class App extends Component {
  
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
          <Navigation storedUser={this.setStateUser} signnedUser={this.state.signnedUser} />
          
          <main>
            <Switch>
              <Route path="/" exact render={() => <PublicationMain currentUser={this.state.signnedUser} />} />
              <Route path="/entries" exact render={() => <PublicationList currentUser={this.state.signnedUser} />} />
              <Route path="/entries/:publication_id" render={props => <PublicationDetails storedUser={this.setStateUser} signnedUser={this.state.signnedUser} {...props} />} />
              <Route path="/new" render={props => <PublicationCreate currentUser={this.setStateUser} signnedUser={this.state.signnedUser}  {...props} />} />
              <Route path="/edit" render={props => <PublicationDetails currentUser={this.setStateUser} signnedUser={this.state.signnedUser} {...props} />} />
              <Route path="/becomeUser" render={() => <BecomeUser currentUser={this.state.signnedUser} />} />
              <Route path="/about" render={() => <About currentUser={this.state.signnedUser} />} />
             
              
              <Route path="/signup" render={props => <UserSignUp storedUser={this.setStateUser} {...props} />} />
              <Route path="/signin" render={props => <UserSignIn storedUser={this.setStateUser} {...props} />} />
              <Route path="/signout" render={props => <UserSignIn storedUser={this.setStateUser} {...props} />} />
              <Route path="/profile" render={() => this.state.signnedUser ? <UserProfile signnedUser={this.state.signnedUser} storedUser={this.setStateUser} /> : <Redirect to="signin" />} />
            </Switch>
          </main>

          <FootBar />
        </>
      )
    }
}