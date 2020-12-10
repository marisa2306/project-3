import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CoursesService from './../../../service/courses.service'
import SearchBar from './../../shared/SearchBar/SearchBar'
import CourseCard from '../../shared/CourseCard/Course-card'
import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col } from 'react-bootstrap'

class CoursesList extends Component {
    constructor() {
        super()
        this.state = {
            courses: undefined,
            filtered: []
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

    sortByNameAZ = () => {

        const coursesCopy = [...this.state.courses]
        coursesCopy.sort((a, b) => (a.title > b.title) ? 1 : -1)

        this.setState({
            courses: coursesCopy
        })

    }

    sortByNameZA = () => {

        const coursesCopy = [...this.state.courses]
        coursesCopy.sort((a, b) => (a.title < b.title) ? 1 : -1)

        this.setState({
            courses: coursesCopy,
        })

    }

    sortByPrice = () => {

        const coursesCopy = [...this.state.courses]
        coursesCopy.sort((a, b) => (a.price > b.price) ? 1 : -1)

        this.setState({
            courses: coursesCopy
        })

    }

    //SEARCHBAR
    filterCourse = value => {
        const newData = [...this.state.courses].filter(elm => elm.title.includes(value))
        this.setState({ courses: newData })
    }

    render() {
        return (
            <>
                <Container>

                    <h1>Our courses</h1>
                    <Row>
                        <Col md={6}>
                            <SearchBar filterCourse={this.filterCourse} />
                        </Col>
                        <Col md={6}>

                            <button className="btn btn-info mr-2 mb-5 mt-5" onClick={this.sortByNameAZ}>Sort by Name A-Z</button>
                            <button className="btn btn-info mr-2 mb-5 mt-5" onClick={this.sortByNameZA}>Sort by Name Z-A</button>
                            <button className="btn btn-info mr-2 mb-5 mt-5" onClick={this.sortByPrice}>Sort by Price Min Max</button>

                        </Col>
                    </Row>
                    {/* { this.props.loggedUser && this.props.teacherInfo ? 
                        <Link to='/profile-teacher/create-course' className='btn btn-success my-4'>Create new course</Link> : null } */}

                    <Row>


                        {this.state.courses ? this.state.courses.map(elm =>
                            <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} />)
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