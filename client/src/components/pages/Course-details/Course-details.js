import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CoursesService from './../../../service/courses.service'

import { Container, Row, Col } from 'react-bootstrap'
import './Course-details.css'

import Loader from './../../shared/Spinner/Loader'


class CourseDetails extends Component {
    constructor() {
        super()
        this.state = {
            course: undefined
        }
        this.coursesService = new CoursesService()
    }

    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            .getCourse(course_id)
            .then(res => this.setState({ course: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className="course-details">
                {this.state.course
                    ?
                    <>
                        <h1>{this.state.course.title}</h1>
                        <p>by {this.state.course.owner}</p>
                        <hr />
                        <Row>
                            <Col md={{ span: 6, offset: 1 }} >
                                <img src={this.state.course.courseImg} alt={this.state.course.title} />
                            </Col>
                            <Col md={4}>
                                <h3>Description</h3>
                                <p>{this.state.course.description}</p>
                                <p>Category: {this.state.course.category}</p>
                                <p>Difficulty Level: {this.state.course.difficultyLevel}</p>
                                <p>Price: {this.state.course.priceRanges.max}{this.state.course.priceRanges.currency}</p>
                                <p>Duration: {this.state.course.duration}</p>
                                <p>Requirements: {this.state.course.requirements}</p>
                                <Link to="/courses" className="btn btn-sm btn-dark">Go back</Link>
                            </Col>
                        </Row>
                    </>
                    :
                    <Loader />
                }

            </Container>
        )
    }
}

export default CourseDetails


