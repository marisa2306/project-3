import { Container, Image, Col, Row, Button } from 'react-bootstrap'
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
import TabNav from './../../../shared/TabsNav/TabNav'
import Tab from './../../../shared/TabsNav/Tab'

import './UserProfile.css'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacherCourses: undefined,
      favCourses: [],
      favTeachers: [],
      learningActivity: [],
      showModal: false,
      selected: 'Favorite Courses',
      randomCourses: []
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

  setSelected = tab => this.setState({ selected: tab })

  refreshCourses = () => {
    this.coursesServices
      .getRandomCourses()
      .then(response => this.setState({ randomCourses: response.data }))
      .catch(() => {
        this.props.history.push('/')
        this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
      })

    if (this.props.teacherInfo) {
      this.coursesServices
        .getTeacherCourses(this.props.teacherInfo._id)
        .then(response => this.setState({ teacherCourses: response.data }))
        .catch(() => {
          this.props.history.push('/')
          this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
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
          this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
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
          this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
        })
    }
  }

  componentDidUpdate = currentProps => {
    this.state.favCourses.length !== currentProps.loggedUser.favCourses.length && this.getFavsCourses()
    this.state.favTeachers.length !== currentProps.loggedUser.favTeachers.length && this.getFavsTeachers()
  }


  deleteUser = () => {
    this.usersServices
      .deleteUser(this.props.loggedUser._id)
      .then(() => {
        this.props.handleToast(true, 'User deleted', '#d4edda')
        this.props.storeUser(undefined)
        this.props.history.push('/')
      })
      .catch(() => {
        this.props.history.push('/')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', '#f8d7da')
      })
  }

  handleModal = visible => this.setState({ showModal: visible })

  render() {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

        <Popup show={this.state.showModal} handleModal={this.handleModal} color={'#f8d7da'}>
          <DeleteMessage />
          <Row className='justify-content-center'>
            <Col xs='auto'>
              <Button variant='secondary' onClick={() => this.handleModal(false)}>Close</Button>
            </Col>
            <Col xs='auto'>
              <Button to={`/profile/delete-user/${this.props.loggedUser._id}`} onClick={this.deleteUser} variant='danger'>Delete account</Button>
            </Col>
          </Row>
        </Popup>

        <Container className="user-profile">
          <h1 className="mt-5 mb-3">Welcome back {this.props.loggedUser.username} !</h1>

          {/* User details */}
          <section className="user-details">
            <article>
              <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
              <div className="user-fields">
                <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
                <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
                <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
              </div>
            </article>

            <div className="user-buttons">
              <Link to='/profile/edit-user' className="btn btn-info">Edit details</Link>
              <Button onClick={() => this.handleModal(true)} className="btn btn-danger">Delete user</Button>

              {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
                ?
                <Link to={`/teachers/${this.props.teacherInfo._id}`} className="btn btn-warning">Teacher profile</Link>
                : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                  <Link to='/profile/create-teacher' className="btn btn-success">Create teacher profile</Link>
                  : null
              }
            </div>
          </section>


          {/* Your activity*/}
          <h2 className="mt-5 mb-3">Your activity</h2>
          <Row className="mt-5">
            <Col>
              <TabNav tabs={['Favorite Courses', 'Favorite Teachers', 'Suggested Courses']} selected={this.state.selected} setSelected={this.setSelected}   >
                {this.state.favCourses.length > 0 &&
                  <Tab isSelected={this.state.selected === 'Favorite Courses'} >
                    <section>
                      <Row>
                        {
                          this.state.favCourses.map(elm =>
                            <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavCourses={this.props.updateFavCourses} />)
                        }
                      </Row>
                    </section>
                  </Tab>

                }
                {this.state.favTeachers.length > 0 &&
                  <Tab isSelected={this.state.selected === 'Favorite Teachers'} >
                    <Row style={{ width: '100 %' }}>
                      {
                        this.state.favTeachers.map(elm =>
                          <TeacherCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavTeachers={this.props.updateFavTeachers} />)
                      }
                    </Row>
                  </Tab>

                }
                {this.state.randomCourses.length > 0 &&
                  <Tab isSelected={this.state.selected === 'Suggested Courses'} >
                    <Row>
                      {
                        this.state.randomCourses.map(elm =>
                          <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavCourses={this.props.updateFavCourses} />)
                      }
                    </Row>
                  </Tab>

                }
              </TabNav>
            </Col>
          </Row>

          <Link to="/courses" className="btn btn-outline-dark mt-5">Go back</Link>
        </Container>
      </motion.div >
    )
  }
}


export default UserProfile