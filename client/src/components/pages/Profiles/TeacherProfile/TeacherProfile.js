import { Container, Image, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CoursesServices from '../../../../service/courses.service'
import TeachersServices from '../../../../service/teachers.service'
import React, { Component } from 'react'
import CourseCard from '../../../shared/CourseCard/Course-card'
import Loader from './../../../shared/Spinner/Loader'
import './TeacherProfile.css'

class TeacherProfile extends Component {
  constructor() {
    super()
    this.state = {
      courses: undefined
    }
    this.teachersServices = new TeachersServices()
    this.coursesServices = new CoursesServices()
  }

  componentDidMount = () => this.refreshCourses()

  refreshCourses = () => {
    this.coursesServices
      .getTeacherCourses(this.props.teacherInfo._id)
      .then(response => this.setState({ courses: response.data }))
      .catch(() => {
        this.props.history.push('/profile')   //  TO-DO -- ¿está bien así?
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
      .catch(() => this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')) //  TO-DO -- ¿está bien así?
  }

  deleteTeacher = () => {
    const teacher_Id = this.props.teacherInfo._id

    !this.state.courses
      ?
      this.teachersServices
        .deleteTeacher(teacher_Id)
        .then(() => {
          this.props.storeUser(this.props.loggedUser)
          this.props.history.push('/profile')
          this.props.handleToast(true, 'Delete successful!', 'green')
        })
        .catch(() => this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')) //  TO-DO -- ¿está bien así?
      :

      this.coursesServices
        .deleteTeacherCourses(teacher_Id)
        .then(() => this.teachersServices.deleteTeacher(teacher_Id))
        .then(() => {
          this.props.storeUser(this.props.loggedUser)
          this.props.history.push('/profile')
          this.props.handleToast(true, 'Delete successful!', 'green')
        })
        .catch(() => this.props.handleToast(true, 'An error has occurred while deleting, please try again later', 'red')) //  TO-DO -- ¿está bien así?
  }

  render() {
    return (
      <>
        <Container className="teacher-profile">
          <Row>

            <Col md={{ span: 9 }}>
              <p className="instructor" style={{ color: '#73726c' }}>INSTRUCTOR</p>
              <h1>{this.props.teacherInfo.name} {this.props.teacherInfo.surname} </h1>
              <p><strong>{this.props.teacherInfo.jobOccupation}</strong></p>
              <hr></hr>
              <h3><strong>About me</strong></h3>
              <p>{this.props.teacherInfo.description}</p>
            </Col>
            <Col md={{ span: 2, offset: 1 }} className="d-flex align-items-center flex-column">
              <Row>
                <Image src={this.props.loggedUser.imageUrl} className="user-img mb-3" roundedCircle alt={this.props.teacherInfo.name} />
              </Row>
              <Row className="mb-5">
                {/* 
              {this.props.teacherInfo.url ?
                this.props.teacherInfo.url.map(elm => <a className="btn btn-success" href={this.props.teacherInfo.url} target="_blank" key={elm._id}{...elm}>Linkedin</a>)
                : null
              } */}
                {this.props.teacherInfo.linkedin ?
                  <a className="btn btn-outline-primary btn-block " href={this.props.teacherInfo.linkedin} target="_blank">Linkedin</a>
                  : null
                }
                {this.props.teacherInfo.website ?
                  <a className="btn btn-outline-primary btn-block " href={this.props.teacherInfo.website} target="_blank">Website</a>
                  : null
                }
                {this.props.teacherInfo.youtube ?
                  <a className="btn btn-outline-primary btn-block " href={this.props.teacherInfo.youtube} target="_blank">Youtube</a>
                  : null
                }
              </Row>
              <Row >
                <Link to='/profile-teacher/edit-teacher' className="btn btn-info btn-block">Edit teacher details</Link>
                <Button onClick={this.deleteTeacher} className="btn btn-danger btn-block">Delete teacher</Button>
                <Link to='/profile-teacher/create-course' className="btn btn-success btn-block">Create new course</Link>
              </Row>
            </Col>

          </Row>
          <hr></hr>

          <Row>
            <Col md={12}>
              <h2 className="mt-5 mb-5">Your Courses</h2>
            </Col>
          </Row>
          <Row>
            {
              this.state.courses
                ?
                this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} teacher={this.props.teacherInfo} userInfo={this.props.loggedUser} deleteCourse={this.deleteCourse} />)
                :
                <Col className="cta">
                  <Row className="d-flex justify-content-between">
                    <p className="mt-2 mb-0">Let's start teaching, <strong>{this.props.loggedUser.username}</strong>! Create an Engaging Course.</p>
                    <Link to='/profile-teacher/create-course' className="btn btn-success btn-block">Create new course</Link>
                  </Row>
                </Col>
            }
          </Row>
        </Container>
      </>
    )
  }
}


export default TeacherProfile