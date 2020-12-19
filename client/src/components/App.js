import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'



import Navigation from './layout/navBar/NavBar'
import FootBar from './layout/footBar/FootBar'


import About from './pages/about/About'
import BecomeUser from './pages/becomeUser/BecomeUser'


import PublicationMain from './pages/main/Main'
import PublicationList from './pages/publication/list/PublicationList'
import PublicationDetails from './pages/publication/details/PublicationDetails'
import PublicationCreate from './pages/publication/create/PublicationCreate'


import UserSignIn from './pages/user/signIn/UserSignIn'
import UserSignUp from './pages/user/signUp/UserSignUp'
import UserProfile from './pages/user/profile/UserProfile'


import ServiceAuth from '../service/auth.service'




export default class App extends Component {
  
    constructor() {
      super()
        this.state = { signnedUser: undefined }
        this.serviceAuth = new ServiceAuth()
    }

  
    componentDidMount = () => {
      this.serviceAuth
          .signnedIn()
          .then(response => this.setStateUser(response.data))
          .catch(err => this.setStateUser(undefined))
    }

  
    setStateUser = user => this.setState({ signnedUser: user }, () => console.log('CURRENT APP STATE:', this.state))
    
  
    render(){
    return (
        <>
            <Navigation storedUser={this.setStateUser} signnedUser={this.state.signnedUser} />

            <main>
              <Switch>
                <Route path="/" exact render={() => <PublicationMain currentUser={this.state.signnedUser} />} />
                <Route path="/entries" exact render={() => <PublicationList currentUser={this.state.signnedUser} />} />
                <Route path="/entries/:publication_id" render={props => <PublicationDetails storeUser={this.setStateUser} signnedUser={this.state.signnedUser} {...props} />} />
                <Route path="/new" render={props => this.state.signnedUser ? <PublicationCreate storeUser={this.setStateUser} signnedUser={this.state.signnedUser} {...props} /> : <Redirect to="/signin" />} />
                <Route path="/edit" render={props => <PublicationDetails currentUser={this.setStateUser} signnedUser={this.state.signnedUser} {...props} />} />
                <Route path="/becomeUser" render={() => <BecomeUser signnedUser={this.state.signnedUser} />} />
                <Route path="/about" render={() => <About signnedUser={this.state.signnedUser} />} />


                <Route path="/signup" render={props => <UserSignUp storeUser={this.setStateUser} {...props} />} />
                <Route path="/signin" render={props => <UserSignIn storeUser={this.setStateUser} {...props} />} />
                <Route path="/signout" render={props => <UserSignIn storeUser={this.setStateUser} {...props} />} />
                <Route path="/profile" render={() => this.state.signnedUser ? <UserProfile signnedUser={this.state.signnedUser} storeUser={this.setStateUser} /> : <Redirect to="/" />} />
              </Switch>
            </main>

            <FootBar />
        </>
      )
    }
}