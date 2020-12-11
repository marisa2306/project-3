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

      <Container>
        <h1 className="mb-5">Welcome, {this.props.teacherInfo.name} {this.props.teacherInfo.surname} !</h1>
        <hr></hr>
        <Row>
          <Col md={1}>
            <Image src={this.props.teacherInfo.imageUrl} className="user-img" roundedCircle alt={this.props.teacherInfo.name} />
          </Col>

          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Job Occupation:</strong> {this.props.teacherInfo.jobOccupation}</p>
          </Col>
        </Row>

        <hr></hr>

        <Row>
          <Col md={4}>
            <Link to='/profile-teacher/edit-teacher' className="btn btn-info btn-block">Edit your teacher details</Link>
          </Col>
          <Col md={4}>
            <Link to='/profile-teacher/create-course' className="btn btn-success btn-block">Create new course</Link>
          </Col>
          <Col md={4}>
            <Button onClick={this.deleteTeacher} className="btn btn-danger btn-block">Delete teacher</Button>
          </Col>
        </Row>

        <Row>
          <h2 className="mt-5">Your Courses</h2>
        </Row>
        <Row>
          {
            this.state.courses
              ?
              this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} teacher={this.props.teacherInfo} userInfo={this.props.loggedUser} deleteCourse={this.deleteCourse} />)
              :
              <Loader />
          }
        </Row>
      </Container>
    )
  }
}


export default TeacherProfile