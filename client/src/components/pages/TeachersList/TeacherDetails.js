import { Container, Image, Col, Row } from 'react-bootstrap'
import React, { Component } from 'react'
import './TeacherDetails.css'
import CoursesServices from '../../../service/courses.service'
import TeachersServices from '../../../service/teachers.service'
import CourseCard from '../../shared/CourseCard/Course-card'
import Loader from '../../shared/Spinner/Loader'

class TeacherDetails extends Component {
  constructor() {
    super()
    this.state = {
      courses: undefined,
      teacher: undefined
    }
    this.teachersServices = new TeachersServices()
    this.coursesServices = new CoursesServices()
  }

  componentDidMount = () => this.refreshTeacher()

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


  render() {
    return (

      <Container>
        { this.state.teacher
          ?
          <>
            <h1 className="mb-5">{this.state.teacher.name} {this.state.teacher.surname} !</h1>
            <hr></hr>
            <Row>
              <Col md={1}>
                <Image src={this.state.teacher.imageUrl} className="teacher-img" roundedCircle alt={this.state.teacher.name} />
              </Col>

              <Col md={{ span: 10, offset: 1 }}>
                <p><strong>Job Occupation</strong>{this.state.teacher.jobOccupation}</p>
                {/* <Link to='/profile-teacher/edit-teacher' className="btn btn-info">Edit your teacher details</Link> */}
              </Col>
            </Row>

            <hr></hr>

            {/* <Row>
                <Link to='/profile-teacher/create-course' className="btn btn-success">Create new course</Link>
              </Row> */}

            <Row>
              <h2 className="mt-5"> {this.state.teacher.name} Courses</h2>
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
          </>
          : <Loader />
        }
      </Container>
    )
  }
}


export default TeacherDetails