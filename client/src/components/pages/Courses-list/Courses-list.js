import React, { Component } from 'react'
import CoursesService from './../../../service/courses.service'

import CourseCard from './Course-card'
import Loader from './../../shared/Spinner/Loader'
import NewCourseForm from './../Course-form/New-Course-form'

import { Container, Row, Button, Modal } from 'react-bootstrap'


import './Courses-list.css'

class CoursesList extends Component {

    constructor() {
        super()
        this.state = {
            courses: undefined,
            showModal: false
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

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                <Container>

                    <h1>Our courses</h1>

                    {this.props.loggedUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm">Create new course</Button>}

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


                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <NewCourseForm closeModal={() => this.handleModal(false)} updateList={this.refreshCourses} loggedUser={this.props.loggedUser} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default CoursesList