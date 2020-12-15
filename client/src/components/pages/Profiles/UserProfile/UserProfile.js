import { Container, Image, Col, Row, Button, Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { motion } from 'framer-motion'
import UsersServices from './../../../../service/users.service'
import CoursesServices from './../../../../service/courses.service'
import TeacherServices from './../../../../service/teachers.service'
import CourseCard from './../../../shared/CourseCard/Course-card'
import TeacherCard from './../../TeachersList/TeacherCard'
import Popup from '../../../shared/Popup/Popup'
import DeleteMessage from '../../../shared/Delete-message/DeleteMessage'
import Loader from '../../../shared/Spinner/Loader'
import './UserProfile.css'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacherCourses: undefined,
      favCourses: [],
      favTeachers: [],
      learningActivity: [],
      showModal: false
    }
    this.usersServices = new UsersServices()
    this.coursesServices = new CoursesServices()
    this.teachersServices = new TeacherServices()
  }

  componentDidMount = () => {
    this.refreshCourses()
    this.getFavsCourses()
    this.getFavsTeachers()
  }

  refreshCourses = () => {
    if (this.props.teacherInfo) {
      this.coursesServices
        .getTeacherCourses(this.props.teacherInfo._id)
        .then(response => this.setState({ teacherCourses: response.data }))
        .catch(() => {
          this.props.history.push('/')
          this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
        })
    }
  }

  getFavsCourses = () => {
    if (this.props.loggedUser.favCourses) {
      this.usersServices
        .getUserFavCourses(this.props.loggedUser._id)
        .then(response => this.setState({ favCourses: response.data }))
        .catch(() => {
          this.props.history.push('/')
          this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
        })
    }
  }

  getFavsTeachers = () => {
    if (this.props.loggedUser.favTeachers) {
      this.usersServices
        .getUserFavTeachers(this.props.loggedUser._id)
        .then(response => this.setState({ favTeachers: response.data }))
        .catch(() => {
          this.props.history.push('/')
          this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
        })
    }
  }

  componentDidUpdate = currentProps =>
    this.state.favCourses.length !== currentProps.loggedUser.favCourses.length ? this.getFavsCourses()
      : this.state.favTeachers.length !== currentProps.loggedUser.favTeachers.length ? this.getFavsTeachers()
        : null




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
      .catch(() => {
        this.props.history.push('/')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
      })
  }

  // delete teacher no courses created
  deleteTeacherAndUser = () => {
    this.teachersServices
      .deleteTeacher(this.props.teacherInfo._id)
      .then(() => this.deleteOnlyUser())
      .catch(() => {
        this.props.history.push('/')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
      })
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
      .catch(() => {
        this.props.history.push('/')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
      })
  }

  handleModal = visible => this.setState({ showModal: visible })

  render() {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Popup show={this.state.showModal} handleModal={this.handleModal} color={'maroon'}>
          <DeleteMessage />
          <Row className='justify-content-center'>
            <Col xs='auto'>
              <Button variant='secondary' onClick={() => this.handleModal(false)}>Close</Button>
            </Col>
            <Col xs='auto'>
              <Button to={`/profile/delete-user/${this.props.loggedUser._id}`} onClick={this.deleteAll} variant='light'>Delete account</Button>
            </Col>
          </Row>
        </Popup>

        <Container className="user-profile">
          <h1 className="mt-5 mb-3">Welcome back {this.props.loggedUser.username} !</h1>

          {/* User details */}
          <section className="user-details">
            <Row>
              <Col md={1} lg={1}>
                <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
              </Col>
              <Col md={{ span: 8, offset: 3 }} lg={{ span: 9, offset: 2 }}>
                <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
                <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
                <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
                <Row className="d-flex">

                  <Link to='/profile/edit-user' className="btn btn-info mr-3">Edit details</Link>
                  <Button onClick={() => this.handleModal(true)} className="btn btn-danger mr-5">Delete user</Button>

                  {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
                    ?
                    <Link to={`/teachers/${this.props.teacherInfo._id}`} className="btn btn-warning">Teacher profile</Link>
                    : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                      <Link to='/profile/create-teacher' className="btn btn-success">Create teacher profile</Link>
                      : null
                  }
                </Row>
              </Col>
            </Row>
          </section>

          {/* Your activity */}
          <h2 className="mt-5 mb-3">Your activity</h2>
          <Row>

            {this.state.favCourses.length > 0 || this.state.favTeachers.length > 0 || this.state.learningActivity.length > 0 ?
              <Tabs className="mt-3" defaultActiveKey="courses" id="favs">
                {this.state.favCourses.length > 0 ?
                  <Tab className="mt-3 mb-3" eventKey="courses" title="Favorite Courses">
                    <Container>
                      <Row>
                        <h2 className="mt-3 mb-3 text-center">Your favorite Courses</h2>
                      </Row>
                      <Row>
                        {
                          this.state.favCourses.map(elm =>
                            <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavCourses={this.props.updateFavCourses} />)
                        }
                      </Row>
                    </Container>
                  </Tab>
                  : <Tab eventKey="courses" title="Favorite Teachers" disabled></Tab>
                }
                {this.state.favTeachers.length > 0 ?
                  <Tab eventKey="teachers" title="Favorite Teachers" >
                    <Container>
                      <Row>
                        <h2 className="mt-3 mb-3 text-center">Your Favorite Teachers </h2>
                      </Row>
                      <Row>
                        {
                          this.state.favTeachers.map(elm =>
                            <TeacherCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavTeachers={this.props.updateFavTeachers} />)
                        }
                      </Row>
                    </Container>
                  </Tab>
                  : <Tab eventKey="teachers" title="Favorite Teachers" disabled></Tab>
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
              : <Col className="cta">
                <Row className="d-flex justify-content-between">
                  <p className="mt-2 mb-0">Let's start learning, <strong>{this.props.loggedUser.username}</strong>! Get in-demand skills to impress anyone.</p>
                  <Link to='/courses' className="btn btn-success">Start a course</Link>
                </Row>
              </Col>
            }
          </Row>
        </Container>
      </motion.div>
    )
  }
}


export default UserProfile