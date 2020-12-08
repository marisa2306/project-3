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
import TeachersList from './pages/TeachersList/TeachersList'
import TeacherDetails from './pages/TeachersList/TeacherDetails'
import NewCourseForm from './pages/Course-form/New-Course-form'
import Signup from './pages/Signup/Signup'
import UserProfile from './pages/Profiles/UserProfile/UserProfile'
import TeacherProfile from './pages/Profiles/TeacherProfile/TeacherProfile'
import NewTeacherForm from './pages/Profiles/TeacherProfile/Create-Teacher-form'
import EditTeacherForm from './pages/Profiles/TeacherProfile/Edit-Teacher-Form'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
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

  setTheUser = (user) => this.setState({ loggedInUser: user }, () => this.state.loggedInUser ? this.setTheTeacher(user) : null)

  setTheTeacher = () => {
    this.teachersServices
      .getTeacher(this.state.loggedInUser._id)
      .then(response => this.setState({ teacher: response.data[0] }))
      .catch(err => this.setState({ teacher: undefined }))
  }


  render() {
    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />

        <main>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/courses" render={() => <CoursesList loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} />} />
            <Route path="/courses/:course_id" render={props => <CourseDetails {...props} />} />
            <Route exact path="/teachers" render={() => <TeachersList loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} />} />
            <Route path="/teachers/:teacher_id" render={props => <TeacherDetails {...props} />} />
            <Route path="/signup" render={props => this.state.loggedInUser ? <Redirect to='/courses' /> : <Signup {...props} storeUser={this.setTheUser} />} />
            <Route exact path="/profile" render={() => this.state.loggedInUser ? <UserProfile loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
            <Route path="/profile/create-teacher" render={props => this.state.loggedInUser ? <NewTeacherForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
            <Route exact path="/profile-teacher" render={() => this.state.teacher ? <TeacherProfile loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
            <Route path='/profile-teacher/edit-teacher' render={props => this.state.loggedInUser ? <EditTeacherForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
            <Route path="/profile-teacher/create-course" render={props => this.state.teacher ? <NewCourseForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} /> : <Redirect to='/signup' />} />
          </Switch>
        </main>
      </>
    )
  }
}

export default App