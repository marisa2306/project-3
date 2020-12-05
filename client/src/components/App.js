import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './layout/navigation/Navigation'
import CoursesList from './pages/Courses-list/Courses-list'
import CourseDetails from './pages/Course-details/Course-details'
import NewCourseForm from './pages/Course-form/New-Course-form'
import Login from './pages/login-form/LoginForm'
// import Signup from './pages/Signup/Signup'
// import Profile from './pages/Profile/Profile'

import AuthServices from './../service/auth.service'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices()
  }

  componentDidMount = () => {

    this.authServices   // comprobar si el usuario tenia sesion iniciada de antes
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('New state of the de App is:', this.state))

  render() {

    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />

        <main>
          <Switch>
            <Route path="/courses" exact render={() => <CoursesList loggedUser={this.state.loggedInUser} />} />
            <Route path="/courses/:course_id" render={props => <CourseDetails {...props} />} />
            <Route path="/create" render={() => <NewCourseForm />} />
            {/* <Route path="/signup" render={props => <Signup storeUser={this.setTheUser} {...props} />} /> */}
            <Route path="/login" render={props => <Login storeUser={this.setTheUser} {...props} />} />
            {/* <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} /> */}
          </Switch>
        </main>
      </>
    )
  }
}

export default App