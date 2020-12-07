import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthServices from './../service/auth.service'
import TeachersServices from './../service/teachers.service'
import Navigation from './layout/navigation/Navigation'
import Home from './pages/Home/Home'
import CoursesList from './pages/Courses-list/Courses-list'
import CourseDetails from './pages/Course-details/Course-details'
import NewCourseForm from './pages/Course-form/New-Course-form'
import Signup from './pages/Signup/Signup'
import UserProfile from './pages/Profiles/UserProfile/UserProfile'
import TeacherProfile from './pages/Profiles/TeacherProfile/TeacherProfile'
import NewTeacherForm from './pages/Profiles/TeacherProfile/Create-Teacher-form'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
      isTeacher: false,
      teacher: undefined
    }
    this.authServices = new AuthServices()
    this.teachersServices = new TeachersServices()
  }

  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))

  }

  setTheUser = (user) => this.setState({ loggedInUser: user, isTeacher: user && user.role === 'Teacher' },
    () => this.state.loggedInUser ? this.setTheTeacher(user) : null)

  setTheTeacher = () => {

    this.teachersServices
      .getTeacher(this.state.loggedInUser._id)
      .then(response => this.setState({ teacher: response.data[0] }, () => console.log('New Teacher state', this.state)))
      .catch(err => this.setState({ teacher: undefined }))

  }


  render() {

    console.log('esto es el centralizado', this.state)
    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} isRoleTeacher={this.state.isTeacher} />

        <main>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/courses" render={() => <CoursesList loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} />} />
            <Route path="/courses/:course_id" render={props => <CourseDetails {...props} />} />
            <Route path="/create" render={() => <NewCourseForm />} />
            <Route path="/signup" render={props => this.state.loggedInUser ? <Redirect to='/courses' /> : <Signup storeUser={this.setTheUser} {...props} />} />
            <Route exact path="/profile" render={() => this.state.loggedInUser ? <UserProfile loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
            <Route path="/profile/create-teacher" render={props => <NewTeacherForm loggedUser={this.state.loggedInUser} {...props} teacherInfo={this.state.teacher} />} />
            <Route exact path="/profile-teacher" render={() => <TeacherProfile loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} />} />
            <Route path="/profile-teacher/create-course" render={props => <NewCourseForm loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} {...props} />} />
          </Switch>
        </main>
      </>
    )
  }
}

export default App