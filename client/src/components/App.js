import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './layout/navigation/Navigation'
// import CoasterList from './pages/Coasters-list/Coasters-list'
// import CoasterDetails from './pages/Coaster-details/Coaster-details'
// import CoasterForm from './pages/Coaster-form/Coaster-form'
// import Signup from './pages/Signup/Signup'
// import Login from './pages/Login/Login'
// import Profile from './pages/Profile/Profile'

import AuthServices from './../service/auth.service'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices
  }

  componentDidMount = () => {

    this.authServices   // comprobar si el usuario tenia sesion iniciada de antes
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))

  render() {

    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />

        {/* <main>
          <Switch>
            <Route path="/montañas" exact render={() => <CoasterList loggedUser={this.state.loggedInUser} />} />
            <Route path="/montañas/:coaster_id" render={props => <CoasterDetails {...props} />} />
            <Route path="/crear" render={() => <CoasterForm />} />
            <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
            <Route path="/inicio-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
            <Route path="/perfil" render={() => this.state.loggedInUser ? <Profile loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
          </Switch>
        </main> */}
      </>
    )
  }
}

export default App