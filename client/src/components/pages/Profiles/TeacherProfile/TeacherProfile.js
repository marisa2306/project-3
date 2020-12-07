import { Container, Image, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CoursesServices from '../../../../service/courses.service'
import TeacherServices from '../../../../service/teachers.service'
import React, { Component } from 'react'
import './TeacherProfile.css'

class TeacherProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacher: undefined
    }
    this.teacherServices = new TeacherServices()

  }

  componentDidMount = () => {
    console.log('estas son las props que llegan', this.props)
    this.teacherServices
      .getTeacher(this.props.loggedUser._id)
      .then(response => this.setState({ teacher: response.data[0] }, () => console.log('Esto es el new', this.state)))
      .catch(err => console.log(err))
  }


  render() {
    console.log(this.props)
    return (

      <Container>
        <h1>Hola</h1>
        <h1 className="mb-5">Welcome back, teacher {this.props.loggedUser.username} !</h1>
        <hr></hr>

        <Row>
          <Col md={1}>
            <Image src={this.props.loggedUser.profileImg.path} className="user-img" roundedCircle alt={this.props.loggedUser.name, this.props.loggedUser.surname} />
          </Col>
          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Name:</strong> {this.props.loggedUser.name} | <strong>Surname:</strong> {this.props.loggedUser.surname}</p>
            <p><strong>Job Occupation</strong>{this.state.jobOccupation}</p>

            <Link to='/profile/profile-teacher/edit-teacher' className="btn btn-info">Edit your teacher details</Link>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <h2 className="mt-5">Your Courses</h2>
        </Row>
      </Container>
    )
  }
}


export default TeacherProfile