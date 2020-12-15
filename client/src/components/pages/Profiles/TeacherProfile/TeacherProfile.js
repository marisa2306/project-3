import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Col, Row, Button } from 'react-bootstrap'
import CoursesServices from '../../../../service/courses.service'
import TeachersServices from '../../../../service/teachers.service'
import CourseCard from '../../../shared/CourseCard/Course-card'
import Loader from './../../../shared/Spinner/Loader'
import Popup from '../../../shared/Popup/Popup'
import DeleteMessage from '../../../shared/Delete-message/DeleteMessage'
import './TeacherProfile.css'



import EditorContainer from './wysiwyg/EditorContainer'

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

  // refreshCourses = () => {
  //   this.coursesServices
  //     .getTeacherCourses(this.props.teacherInfo._id)
  //     .then(response => this.setState({ courses: response.data }))
  //     .catch(() => {
  //       this.props.history.push('/profile')
  //       this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
  //     })
  // }

  refreshTeacher = () => {             // CORRECCIÓN DE GERMÁN
    const teacher_id = this.props.match.params.teacher_id
    const getTeacher = this.teachersServices.getTheTeacher(teacher_id)
    const getCourses = this.coursesServices.getTeacherCourses(teacher_id)

    Promise.all([getTeacher, getCourses])
      .then(response => this.setState({ teacher: response[0].data, courses: response[1].data }))
      .catch(() => {
        this.props.history.push('/teachers')
        this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
      })
  }

  deleteCourse = course_Id => {
    this.coursesServices
      .deleteCourse(course_Id)
      .then(() => {
        this.refreshCourses()
        this.props.handleToast(true, 'Delete successful!', 'green')
      })
      .catch(() => {
        this.props.history.push('/profile')
        this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
      })
  }

  deleteTeacher = () => {                           // TO-DO ==> llevar a servidor
    const teacher_Id = this.state.teacher._id

    !this.state.courses
      ?
      this.teachersServices
        .deleteTeacher(teacher_Id)
        .then(() => {
          this.props.storeUser(this.props.loggedUser)
          this.props.history.push('/profile')
          this.props.handleToast(true, 'Delete successful!', 'green')
        })
        .catch(() => {
          this.props.history.push('/profile')
          this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
        })

      :

      this.coursesServices
        .deleteTeacherCourses(teacher_Id)
        .then(() => this.teachersServices.deleteTeacher(teacher_Id))
        .then(() => {
          this.props.storeUser(this.props.loggedUser)
          this.props.history.push('/profile')
          this.props.handleToast(true, 'Delete successful!', 'green')
        })
        .catch(() => {
          this.props.history.push('/profile')
          this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')
        })
  }

  handleModal = visible => this.setState({ showModal: visible })

  render() {


    return (
      <>
        <Popup show={this.state.showModal} handleModal={this.handleModal} color={'maroon'}>
          <DeleteMessage />
          <Row className='justify-content-center'>
            <Col xs='auto'>
              <Button variant='secondary' onClick={() => this.handleModal(false)}>Close</Button>
            </Col>
            <Col xs='auto'>
              <Button onClick={this.deleteTeacher} variant='light'>Delete teacher</Button>
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
                      {/* 
              {this.props.teacherInfo.url ?
                this.props.teacherInfo.url.map(elm => <a className="btn btn-success" href={this.props.teacherInfo.url} target="_blank" key={elm._id}{...elm}>Linkedin</a>)
                : null
              } */}
                      {this.state.teacher.linkedin ?
                        <a className="teacher-links-btn " href={this.state.teacher.linkedin} target="_blank"><span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607977090/project3-ironhack/linkedin_3_zpvz48.png" /></span>Linkedin</a>
                        : null
                      }
                      {this.state.teacher.website ?
                        <a className="teacher-links-btn" href={this.state.teacher.website} target="_blank"><span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607977242/project3-ironhack/link_kj6las.png" /></span>Website</a>
                        : null
                      }
                      {this.state.teacher.youtube ?
                        <a className="teacher-links-btn" href={this.state.teacher.youtube} target="_blank"><span><img className="links-icon" src="https://res.cloudinary.com/dodneiokm/image/upload/v1607976945/project3-ironhack/youtube_hgefuo.png" /></span>Youtube</a>
                        : null
                      }

                      {this.props.teacherInfo && this.props.teacherInfo._id === this.state.teacher._id ?
                        <>
                          <Link to='/profile-teacher/edit-teacher' className="teacher-edit mt-5">Edit details</Link>
                          <Button onClick={() => this.handleModal(true)} className="teacher-delete">Delete</Button>
                          <Link to='/profile-teacher/create-course' className="course-add mt-5">Add course</Link>
                        </>
                        :
                        null
                      }
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
                  this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} teacher={this.props.teacherInfo} userInfo={this.props.loggedUser} deleteCourse={this.deleteCourse} updateFavs={this.props.updateFavs} />)
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
            <>
              <Loader />
            </>
          }

          <Link to="/teachers" className="btn btn-outline-dark mt-5">Go back</Link>
        </Container>
      </>
    )
  }
}


export default TeacherProfile