import { Container, Image, Col, Row, Button, Tabs, Tab } from 'react-bootstrap'
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
      favCourses: [],
      favTeachers: [],
      learningActivity: []
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
        .catch(err => console.log(err))   //  TO-DO -- ¿qué hacemos con esto?
    }
  }

  getFavsCourses = () => {
    if (this.props.loggedUser.favorites) {
      this.usersServices
        .getUserFavorites(this.props.loggedUser._id)
        .then(response => this.setState({ favCourses: response.data }))
        .catch(err => console.log(err))   //  TO-DO -- ¿qué hacemos con esto?
    }
  }

  componentDidUpdate = currentProps => this.state.favCourses.length !== currentProps.loggedUser.favorites.length ? this.getFavsCourses() : null

  deleteAll = () => {
    !this.props.teacherInfo ? this.deleteOnlyUser() : !this.state.teacherCourses ? this.deleteTeacherAndUser() : this.deleteCoursesTeacherAndUser()
  }

  // deleteCoursesTeacherAndUser = () => {        CONSEJO GERMÁN -- IRÁ EN SERVER ¿?
  //   this.coursesServices
  //     .deleteTeacherCourses(this.props.teacherInfo._id)
  //     .then(() => this.teachersServices.deleteTeacher(this.props.teacherInfo._id))
  //     .then(() => this.usersServices.deleteUser(this.props.loggedUser._id))
  //     .then(() => {
  //       this.props.handleToast(true, 'User deleted', 'green')
  //       this.props.storeUser(undefined)
  //       this.props.history.push('/')
  //     })
  //     .catch(err => console.log('error al borrar los cursos del teacher', err))   //  TO-DO -- ¿qué hacemos con esto?
  // }

  //    ******  CHUSTI-FUNCTIONS  --  ESTO DEBERÁ IR EN SERVER

  // delete teacher's courses 
  deleteCoursesTeacherAndUser = () => {
    this.coursesServices
      .deleteTeacherCourses(this.props.teacherInfo._id)
      .then(() => this.deleteTeacherAndUser())
      .catch(err => console.log('error al borrar los cursos del teacher', err))   //  TO-DO -- ¿qué hacemos con esto?
  }

  // delete teacher no courses created
  deleteTeacherAndUser = () => {
    this.teachersServices
      .deleteTeacher(this.props.teacherInfo._id)
      .then(() => this.deleteOnlyUser())
      .catch(err => console.log('desde el catch de teacher y user', err))   //  TO-DO -- ¿qué hacemos con esto?
  }

  // delete user with no teacher no courses created
  deleteOnlyUser = () => {
    this.usersServices
      .deleteUser(this.props.loggedUser._id)
      .then(() => {
        this.props.handleToast(true, 'User deleted', 'green')
        this.props.storeUser(undefined)
        this.props.history.push('/')
      })
      .catch(err => console.log('desde el catch del user', err))   //  TO-DO -- ¿qué hacemos con esto?
  }


  render() {
    return (

      <Container className="user-profile">
        <h1 className="mt-5 mb-3">Welcome back {this.props.loggedUser.username} !</h1>

        {/* User details */}
        <hr></hr>
        <Row>
          <Col md={1}>
            <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
          </Col>
          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
            <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
            <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
            <Row>
              <Col md={{ span: 5 }}>
                <Link to='/profile/edit-user' className="btn btn-info mr-3">Edit account details</Link>
                <Button to={`/profile/delete-user/${this.props.loggedUser._id}`} onClick={this.deleteAll} className="btn btn-danger">Delete account</Button>
              </Col>
              <Col md={{ span: 3, offset: 4 }}>
                {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
                  ?
                  <Link to='/profile-teacher' className="btn btn-warning" >View your teacher profile</Link>
                  : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                    <Link to='/profile/create-teacher' className="btn btn-success">Create teacher profile</Link>
                    : null
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <hr></hr>

        {/* Your activity */}
        <h2 className="mt-5 mb-3">Your activity</h2>
        <Row>
          {this.state.favCourses.length > 0 || this.state.favTeachers.length > 0 || this.state.learningActivity.length > 0 ?
            <Tabs className="mt-3" defaultActiveKey="courses" id="favs">
              {this.state.favCourses.length > 0 ?
                <Tab className="mt-3 mb-3" eventKey="courses" title="Favourites Courses">
                  <Container>
                    <Row>
                      <h2 className="mt-3 mb-3 text-center">Your favorite Courses</h2>
                    </Row>
                    <Row>
                      {
                        this.state.favCourses.map(elm =>
                          <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavs={this.props.updateFavs} />)
                      }
                    </Row>
                  </Container>
                </Tab>
                : <Tab eventKey="courses" title="Favourites Courses" disabled></Tab>
              }
              {this.state.favTeachers.length > 0 ?
                <Tab eventKey="teachers" title="Favourites Teachers" >
                  <Container>
                    <Row>
                      <h2 className="mt-3 mb-3 text-center">Your Learning Activity</h2>
                    </Row>
                  </Container>
                </Tab>
                : <Tab eventKey="teachers" title="Favourites Teachers" disabled></Tab>
              }
              {this.state.learningActivity.length > 0 ?
                <Tab eventKey="learning" title="Learning" >
                  <Container>
                    <Row>
                      <h2 className="mt-3 mb-3 text-center">Your Learning Activity</h2>
                    </Row>
                  </Container>
                </Tab>
                : <Tab eventKey="learning" title="Learning Activity" disabled></Tab>
              }
            </Tabs>
            : null
          }
        </Row>
      </Container >
    )
  }
}


export default UserProfile