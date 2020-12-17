import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container, Image, Col, Row, Button } from 'react-bootstrap'
import CoursesServices from '../../../../service/courses.service'
import TeachersServices from '../../../../service/teachers.service'
import CourseCard from '../../../shared/CourseCard/Course-card'
import Loader from './../../../shared/Spinner/Loader'
import Popup from '../../../shared/Popup/Popup'
import DeleteMessage from '../../../shared/Delete-message/DeleteMessage'
import './TeacherProfile.css'


class TeacherProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacher: undefined,
      courses: undefined,
      showModal: false
    }
    this.teachersServices = new TeachersServices()
    this.coursesServices = new CoursesServices()
  }

  componentDidMount = () => this.refreshTeacher()

  refreshTeacher = () => {
    const teacher_id = this.props.match.params.teacher_id
    const getTeacher = this.teachersServices.getTheTeacher(teacher_id)
    const getCourses = this.coursesServices.getTeacherCourses(teacher_id)

    Promise.all([getTeacher, getCourses])
      .then(response => this.setState({ teacher: response[0].data, courses: response[1].data }))
      .catch(() => {
        this.props.history.push('/teachers')
        this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
      })
  }

  deleteCourse = course_Id => {
    this.coursesServices
      .deleteCourse(course_Id)
      .then(() => {
        this.refreshTeacher()
        this.props.handleToast(true, 'Delete successful!', '#d4edda')
      })
      .catch(() => {
        this.props.history.push('/profile')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', '#f8d7da')
      })
  }

  deleteTeacher = () => {
    const teacher_Id = this.state.teacher._id

    this.teachersServices
      .deleteTeacher(teacher_Id)
      .then(() => {
        this.props.storeUser(this.props.loggedUser)
        this.props.history.push('/profile')
        this.props.handleToast(true, 'Delete successful!', '#d4edda')
      })
      .catch(() => {
        this.props.history.push('/profile')
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
              <Button onClick={this.deleteTeacher} variant='danger'>Delete teacher</Button>
            </Col>
          </Row>
        </Popup>

        <Container className="teacher-profile">
          {this.state.teacher ?
            <>
              <Row>

                <Col md={{ span: 8 }} lg={{ span: 8 }}>
                  <p className="instructor" style={{ color: '#73726c' }}>INSTRUCTOR</p>
                  <h1>{this.state.teacher.name} {this.state.teacher.surname} </h1>
                  <p><strong>{this.state.teacher.jobOccupation}</strong></p>
                  <hr></hr>
                  {this.props.teacherInfo && this.props.teacherInfo._id === this.state.teacher._id ?
                    <h3><strong>About me</strong></h3>
                    :
                    <h3><strong>About the theacher</strong></h3>}

                  <p>{this.state.teacher.description}</p>
                </Col>
                <Col md={{ span: 4 }} lg={{ span: 3, offset: 1 }} >
                  <aside className="d-flex align-items-center flex-column teacher-badge">
                    <Row>
                      <Image src={this.state.teacher.imageUrl} className="user-img mb-3" roundedCircle alt={this.state.teacher.name} />
                    </Row>

                    <Row className="mt-3 mb-3">
                      {this.state.teacher.linkedin &&
                        <a className="teacher-links-btn" href={this.state.teacher.linkedin} alt='Linkedin button' target="_blank" rel="noreferrer">
                          <span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607977090/project3-ironhack/linkedin_3_zpvz48.png" alt='Linkedin icon' />
                          </span>Linkedin</a>}

                      {this.state.teacher.website &&
                        <a className="teacher-links-btn" href={this.state.teacher.website} alt='Website button' target="_blank" rel="noreferrer">
                          <span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607977242/project3-ironhack/link_kj6las.png" alt='Website icon' />
                          </span>Website</a>}

                      {this.state.teacher.youtube &&
                        <a className="teacher-links-btn" href={this.state.teacher.youtube} alt='Youtube button' target="_blank" rel="noreferrer">
                          <span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607976945/project3-ironhack/youtube_hgefuo.png" alt='Youtube icon' />
                          </span>Youtube</a>}

                      {this.props.teacherInfo && this.props.teacherInfo._id === this.state.teacher._id &&
                        <>
                          <Link to='/profile-teacher/edit-teacher' className="teacher-edit mt-5">Edit details</Link>
                          <Button onClick={() => this.handleModal(true)} className="teacher-delete">Delete</Button>
                          <Link to='/profile-teacher/create-course' className="course-add mt-5">Add course</Link>
                        </>}
                    </Row>
                  </aside>
                </Col>

              </Row>

              <hr></hr>

              <Row>
                <Col md={12}>
                  {this.props.teacherInfo && this.props.teacherInfo._id === this.state.teacher._id ?
                    <h2 className="mt-5 mb-5">My Courses</h2>
                    :
                    <h2 className="mt-5 mb-5">Teacher's Courses</h2>}
                </Col>
              </Row>

              <Row>
                {this.state.courses.length > 0
                  ?
                  this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} teacher={this.props.teacherInfo} userInfo={this.props.loggedUser} deleteCourse={this.deleteCourse} updateFavCourses={this.props.updateFavCourses} />)
                  :
                  this.props.teacherInfo && this.props.teacherInfo._id === this.state.teacher._id
                    ?
                    <Col className="cta">
                      <Row className="d-flex justify-content-between">
                        <p className="mt-2 mb-0">Let's start teaching, <strong>{this.state.teacher.name}</strong>! Create an Engaging Course.</p>
                        <Link to='/profile-teacher/create-course' className="btn btn-success ">Create new course</Link>
                      </Row>
                    </Col>
                    :
                    <Col className="cta">
                      <Row className="d-flex justify-content-between">
                        <p className="mt-2 mb-0">This teacher hasn't created couerses yet.</p>
                        <Link to='/courses' className="btn btn-success ">See more courses</Link>
                      </Row>
                    </Col>
                }
              </Row>
            </>

            :
            <Loader />
          }

          <Link to="/teachers" className="btn btn-outline-dark mt-5">Go back</Link>
        </Container>
      </motion.div>
    )
  }
}


export default TeacherProfile