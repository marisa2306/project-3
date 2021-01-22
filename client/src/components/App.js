import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AuthServices from './../service/auth.service'
import TeachersServices from './../service/teachers.service'
import UsersService from '../service/users.service'

import Navigation from './layout/navigation/Navigation'
import Footer from './layout/Footer/Footer'
import Home from './pages/Home/Home'

import CoursesList from './pages/Courses-list/Courses-list'
import CourseDetails from './pages/Course-details/Course-details'
import NewCourseForm from './pages/Course-form/New-Course-form'
import EditCourseForm from './pages/Course-form/Edit-Course-form'


import Signup from './pages/Signup/Signup'
import UserProfile from './pages/Profiles/UserProfile/UserProfile'
import EditUserForm from './pages/Profiles/UserProfile/EditUserForm'

import TeachersList from './pages/TeachersList/TeachersList'
import TeacherProfile from './pages/Profiles/TeacherProfile/TeacherProfile'
import NewTeacherForm from './pages/Profiles/TeacherProfile/Create-Teacher-form'
import EditTeacherForm from './pages/Profiles/TeacherProfile/Edit-Teacher-Form'

import Alert from './shared/Alert/Alert'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
      teacher: undefined,
      showToast: false,
      toastText: '',
      toastColor: ''
    }
    this.authServices = new AuthServices()
    this.teachersServices = new TeachersServices()
    this.usersServices = new UsersService()

  }

  componentDidMount = () => this.refreshUser()

  refreshUser = () => {
    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(() => this.setTheUser(undefined))
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    user ?
      this.teachersServices
        .getTeacher(this.state.loggedInUser._id)
        .then(response => this.setState({ teacher: response.data[0] }))
        .catch(() => this.setState({ teacher: undefined }))
      : this.setState({ teacher: undefined })
  }

  handleToast = (visible, text, color) => this.setState({ showToast: visible, toastText: text, toastColor: color })

  updateFavCourses = item_id => {
    if (this.state.loggedInUser) {
      const newList = [...this.state.loggedInUser.favCourses].some(elm => elm === item_id) ? [...this.state.loggedInUser.favCourses].filter(elm => elm !== item_id) : [...this.state.loggedInUser.favCourses, item_id]
      this.usersServices
        .updateFavCourses(this.state.loggedInUser._id, newList)
        .then(() => this.refreshUser())
        .catch(() => this.handleToast(true, 'An error has occurred, please try again later', '#f8d7da'))
    }
  }

  updateFavTeachers = item_id => {
    if (this.state.loggedInUser) {
      const newList = [...this.state.loggedInUser.favTeachers].some(elm => elm === item_id) ? [...this.state.loggedInUser.favTeachers].filter(elm => elm !== item_id) : [...this.state.loggedInUser.favTeachers, item_id]
      this.usersServices
        .updateFavTeachers(this.state.loggedInUser._id, newList)
        .then(() => this.refreshUser())
        .catch(() => this.handleToast(true, 'An error has occurred, please try again later', '#f8d7da'))
    }
  }


  render() {
    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} handleToast={this.handleToast} />

        <main>
          <AnimatePresence>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} handleToast={this.handleToast} />} />
              <Route exact path="/courses" render={props => <CoursesList {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} updateFavCourses={this.updateFavCourses} handleToast={this.handleToast} />} />
              <Route path="/courses/:course_id" render={props => <CourseDetails {...props} handleToast={this.handleToast} teacherInfo={this.state.teacher} loggedUser={this.state.loggedInUser} />} />
              <Route exact path="/teachers" render={props => <TeachersList {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} updateFavTeachers={this.updateFavTeachers} handleToast={this.handleToast} />} />
              <Route path="/teachers/:teacher_id" render={props => <TeacherProfile {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} storeUser={this.setTheUser} updateFavCourses={this.updateFavCourses} handleToast={this.handleToast} />} />
              <Route path="/signup" render={props => this.state.loggedInUser ? <Redirect to='/courses' /> : <Signup {...props} handleToast={this.handleToast} storeUser={this.setTheUser} />} />
              <Route exact path="/profile" render={props => this.state.loggedInUser ? <UserProfile {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} storeUser={this.setTheUser} updateFavCourses={this.updateFavCourses} updateFavTeachers={this.updateFavTeachers} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
              <Route path="/profile/edit-user" render={props => this.state.loggedInUser ? <EditUserForm {...props} loggedUser={this.state.loggedInUser} storeUser={this.setTheUser} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
              <Route path="/profile/create-teacher" render={props => this.state.loggedInUser ? <NewTeacherForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} storeUser={this.setTheUser} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
              <Route path='/profile-teacher/edit-teacher' render={props => this.state.loggedInUser ? <EditTeacherForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} storeUser={this.setTheUser} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
              <Route path="/profile-teacher/create-course" render={props => this.state.teacher ? <NewCourseForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
              <Route path="/profile-teacher/edit-course/:course_id" render={props => this.state.teacher ? <EditCourseForm {...props} loggedUser={this.state.loggedInUser} teacherInfo={this.state.teacher} handleToast={this.handleToast} /> : <Redirect to='/signup' />} />
            </Switch>
          </AnimatePresence>
          <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} color={this.state.toastColor} />
        </main>

        <Footer />
      </>
    )
  }
}

export default App