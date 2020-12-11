import { Container, Image, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import UsersServices from './../../../../service/users.service'
import CoursesServices from './../../../../service/courses.service'
import TeacherServices from './../../../../service/teachers.service'
import CourseCard from './../../../shared/CourseCard/Course-card'
import './UserProfile.css'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacherCourses: undefined,
      favCourses: []
    }
    this.usersServices = new UsersServices()
    this.coursesServices = new CoursesServices()
    this.teachersServices = new TeacherServices()
  }

  /////////////////////

  componentDidMount = () => {
    this.refreshCourses()
    this.getFavsCourses()
  }

  refreshCourses = () => {
    if (this.props.teacherInfo) {
      this.coursesServices
        .getTeacherCourses(this.props.teacherInfo._id)
        .then(response => this.setState({ teacherCourses: response.data }))
        .catch(err => console.log(err))
    }
  }

  getFavsCourses = () => {
    if (this.props.loggedUser.favorites) {
      this.usersServices
        .getUserFavorites(this.props.loggedUser._id)
        .then(response => this.setState({ favCourses: response.data }))
        .catch(err => console.log(err))
    }
  }

  componentDidUpdate = currentProps => this.state.favCourses.length !== currentProps.loggedUser.favorites.length ? this.getFavsCourses() : null

  ///////////////////////////
  deleteAll = () => {
    //hay teacher?
    if (this.props.teacherInfo) {
      //hay cursos?
      if (this.state.teacherCourses) {
        this.deleteCoursesTeacherAndUser()
      }
      //teacher no courses
      if (!this.state.teacherCourses) {
        this.deleteTeacherAndUser()
      }
    }
    //no teacher
    if (!this.props.teacherInfo) {
      this.deleteOnlyUser()
    }
  }

  //    ******  CHUSTI-FUNCTIONS

  // delete teacher's courses 
  deleteCoursesTeacherAndUser = () => {
    this.coursesServices
      .deleteTeacherCourses(this.props.teacherInfo._id)
      .then(response => {
        console.log('Cursos borrados del teacher del user', response)
        this.deleteTeacherAndUser()
      })
      .catch(err => console.log('error al borrar los cursos del teacher', err))   // TO-DO  Tostada
  }

  // delete teacher no courses created
  deleteTeacherAndUser = () => {
    this.teachersServices
      .deleteTeacher(this.props.teacherInfo._id)
      .then(response => {
        console.log('Teacher borrado:', response)
        this.deleteOnlyUser()
      })
      .catch(err => console.log('desde el catch de teacher y user', err))    // TO-DO  Tostada
  }

  // delete user with no teacher no courses created
  deleteOnlyUser = () => {
    this.usersServices
      .deleteUser(this.props.loggedUser._id)
      .then(response => {
        console.log('user borrado:', response)
        this.props.storeUser(undefined)
        this.props.history.push('/')
      })
      .catch(err => console.log('desde el catch del user', err))    // TO-DO  Tostada
  }


  render() {
    return (

      <Container>
        <h1 className="mb-5">Welcome back {this.props.loggedUser.username} !</h1>
        <hr></hr>
        {/* User details */}
        <Row>
          <Col md={1}>
            <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
          </Col>
          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
            <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
            <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
            <Link to='/profile/edit-user' className="btn btn-info mr-3">Edit your user details</Link>
            <Button to={`/profile/delete-user/${this.props.loggedUser._id}`} onClick={this.deleteAll} className="btn btn-danger">Delete your account</Button>
          </Col>
        </Row>
        <hr></hr>
        <Row className="mt-5">
          <Col md={6}>
            {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
              ?
              <Link to='/profile-teacher' className="btn btn-warning" >View your teacher profile</Link>
              : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                <Link to='/profile/create-teacher' className="btn btn-success">Create your teacher profile</Link>
                : null
            }
          </Col>
        </Row>
        <Row>
          <h2 className="mt-3 mb-3">Your favourite Courses</h2>
        </Row>
        <Row>

          { this.state.favCourses.map(elm =>
              <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavs={this.props.updateFavs} />)
          }

        </Row>
      </Container>
    )
  }
}


export default UserProfile