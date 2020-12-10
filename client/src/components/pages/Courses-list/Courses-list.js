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
            filteredCourse: []

        }
        this.coursesService = new CoursesService()
    }

    componentDidMount = () => this.refreshCourses()

    refreshCourses = () => {
        this.coursesService
            .getCourses()
            .then(res => this.setState({ courses: res.data, filteredCourse: [...res.data] }))
            .catch(err => console.log(err))
    }

    sortByNameAZ = () => {
        const filteredCourseCopy = [...this.state.filteredCourse]
        filteredCourseCopy.sort((a, b) => (a.title > b.title) ? 1 : -1)

        this.setState({
            filteredCourse: filteredCourseCopy
        })
    }

    sortByNameZA = () => {
        const filteredCourseCopy = [...this.state.filteredCourse]
        filteredCourseCopy.sort((a, b) => (a.title < b.title) ? 1 : -1)

        this.setState({
            filteredCourse: filteredCourseCopy
        })
    }

    sortByPrice = () => {
        const filteredCourseCopy = [...this.state.filteredCourse]
        filteredCourseCopy.sort((a, b) => (a.price > b.price) ? 1 : -1)

        this.setState({
            filteredCourse: filteredCourseCopy
        })
    }

    //SEARCHBAR
    filterCourse = value => {
        const newData = [...this.state.courses].filter(elm => elm.title.toLowerCase().includes(value.toLowerCase()))
        this.setState({ filteredCourse: newData })
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

                    <Row>

                        {this.state.courses ?
                            this.state.filteredCourse.map(elm =>
                                <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} addToFavs={this.props.addToFavs}/>)
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