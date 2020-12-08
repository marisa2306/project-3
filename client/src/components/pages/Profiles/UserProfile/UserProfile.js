import { Container, Image, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import './UserProfile.css'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      teacher: undefined    // cambiará
    }
  }

  render() {
    return (

      <Container>
        <h1 className="mb-5">Welcome back {this.props.loggedUser.username} !</h1>
        <hr></hr>
        {/* User details */}
        <Row>
          <Col md={1}>
            <Image src={this.props.loggedUser.imageUrl} className="user-img" roundedCircle alt={this.props.loggedUser.username} />
          </Col>
          <Col md={{ span: 10, offset: 1 }}>
            <p><strong>Username:</strong> {this.props.loggedUser.username}</p>
            <p><strong>Email:</strong> {this.props.loggedUser.email}</p>
            <p><strong>Role:</strong> {this.props.loggedUser.role}</p>
            <Link to='/profile/edit-user' className="btn btn-info">Edit your user details</Link>
          </Col>
        </Row>
        <hr></hr>
        <Row className="mt-5">
          <Col md={6}>
            {this.props.loggedUser.role === 'Teacher' && this.props.teacherInfo
              ?
              <Link to='/profile-teacher' className="btn btn-warning" >View your teacher profile</Link>
              : this.props.loggedUser.role === 'Teacher' && !this.props.teacherInfo ?
                <Link to='/profile/create-teacher' className="btn btn-success">Create your teacher profile</Link>
                : null
            }
          </Col>
        </Row>
        <Row>
          <h2 className="mt-5">Your favourite Courses</h2>
        </Row>
      </Container>
    )
  }
}


export default UserProfile