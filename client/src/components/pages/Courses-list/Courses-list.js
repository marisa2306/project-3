import React, { Component } from 'react'
import CoursesService from './../../../service/courses.service'

import CourseCard from '../../shared/CourseCard/Course-card'
import Loader from './../../shared/Spinner/Loader'

import { Container, Row } from 'react-bootstrap'

class CoursesList extends Component {
    constructor() {
        super()
        this.state = {
            courses: undefined
        }
        this.coursesService = new CoursesService()
    }

    componentDidMount = () => this.refreshCourses()

    refreshCourses = () => {
        this.coursesService
            .getCourses()
            .then(res => this.setState({ courses: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Container>

                    <h1>Our courses</h1>

                    <Row>
                        {
                            this.state.courses
                                ?
                                this.state.courses.map(elm => <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} />)
                                :
                                <Loader />
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export default CoursesList