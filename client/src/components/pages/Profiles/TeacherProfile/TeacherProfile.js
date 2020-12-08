import { Container, Image, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CoursesServices from '../../../../service/courses.service'
//import TeachersServices from '../../../../service/teachers.service'
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
    //this.teachersServices = new TeachersServices()
    this.coursesServices = new CoursesServices()
  }

  // componentDidMount = () => {
  //   console.log('estas son las props que llegan', this.props)
  //   this.teachersServices
  //     .getTeacher(this.props.loggedUser._id)
  //     .then(response => this.setState({ teacher: response.data[0] }, () => console.log('New Teacher state', this.state)))
  //     .catch(err => console.log(err))
  // }

  componentDidMount = () => {
    this.coursesServices
      .getTeacherCourses(this.props.teacherInfo._id)
      .then(response => this.setState({ courses: response.data }))
      .catch(err => console.log(err))
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
            <p><strong>Job Occupation</strong>{this.props.teacherInfo.jobOccupation}</p>
            <Link to='/profile-teacher/edit-teacher' className="btn btn-info">Edit your teacher details</Link>
          </Col>
        </Row>

        <hr></hr>

        <Row>
          <Link to='/profile-teacher/create-course' className="btn btn-success">Create new course</Link>
        </Row>
        
        <Row>
          <h2 className="mt-5">Your Courses</h2>
        </Row>
        <Row>
          {
            this.state.courses
              ?
              this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} teacher={this.props.teacherInfo} userInfo={this.props.loggedUser} />)
              :
              <Loader />
          }
        </Row>
      </Container>
    )
  }
}


export default TeacherProfile