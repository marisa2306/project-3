import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TeacherCard from './Teacher-Card'
import TeacherServices from './../../../../service/teachers.service'
import React, { Component } from 'react'

class TeacherProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacher: undefined
    }
    this.teacherServices = new TeacherServices()
  }

  componentDidMount = () => {
    this.teacherServices
      .getTeacher(this.props.loggedUser._id)
      .then(response => this.setState({ teacher: response.data[0] }, () => console.log('New Teacher state', this.state)))
      .catch(err => console.log(err))
  }

  render() {

    return (

      <Container>
        <h1>Welcome back teacher, {this.props.loggedUser.username} !</h1>

        {/* User details */}
        <img src={this.props.loggedUser.profileImg.path} alt={this.props.loggedUser.name, this.props.loggedUser.surname} />
        <p><strong>Name:</strong> {this.props.loggedUser.name} </p>
        <p><strong>Surname:</strong> {this.props.loggedUser.surname}</p>
        <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
        <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
        <p><strong>Role:</strong> {this.props.loggedUser.role}</p>

        {this.state.teacher
          ?
          <TeacherCard userInfo={this.props.loggedUser} teacherInfo={this.state.teacher} />
          :
          <Link to='teacher-profile/create-teacher' className="btn btn-success" >Create your teacher profile</Link>
        }
        <h2>Your favourite Courses</h2>

      </Container>
    )
  }
}


export default TeacherProfile