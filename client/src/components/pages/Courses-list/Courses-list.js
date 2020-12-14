import React, { Component } from 'react'
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
            filteredCourses: []

        }
        this.coursesService = new CoursesService()
    }

    componentDidMount = () => this.refreshCourses()

    refreshCourses = () => {
        this.coursesService
            .getCourses()
            .then(res => this.setState({ courses: res.data, filteredCourses: [...res.data] }))
            .catch(() => {
                this.props.history.push('/')
                this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
            })
    }

    filterBySearch = value => this.setState({ filteredCourses: [...this.state.courses].filter(elm => elm.title.toLowerCase().includes(value.toLowerCase())) })

    filterByCategory = option => option !== 'default' ?
        this.setState({ filteredCourses: [...this.state.filteredCourses].filter(elm => elm.category === option) })
        : this.setState({ filteredCourses: [...this.state.courses] })

    filterByLevel = option => option !== 'default' ?
        this.setState({ filteredCourses: [...this.state.filteredCourses].filter(elm => elm.difficultyLevel === option) })
        : this.setState({ filteredCourses: [...this.state.courses] })

    sortBy = option => {
        const filteredCoursesCopy = [...this.state.filteredCourses]
        switch (option) {
            case 'Name-A': this.setState({ filteredCourses: filteredCoursesCopy.sort((a, b) => (a.title > b.title) ? 1 : -1) })
                break;
            case 'Name-Z': this.setState({ filteredCourses: filteredCoursesCopy.sort((a, b) => (a.title < b.title) ? 1 : -1) })
                break;
            case 'Price-asc': this.setState({ filteredCourses: filteredCoursesCopy.sort((a, b) => (a.price > b.price) ? 1 : -1) })
                break;
            case 'Price-desc': this.setState({ filteredCourses: filteredCoursesCopy.sort((a, b) => (a.price < b.price) ? 1 : -1) })
                break;
            default: this.setState({ filteredCourses: [...this.state.courses] })
                break;
        }
    }

    render() {
        return (
            <>
                <Container>

                    <h1 className="mt-5">Our courses</h1>

                    <SearchBar filterBySearch={this.filterBySearch} filterByCategory={this.filterByCategory} filterByLevel={this.filterByLevel} sortBy={this.sortBy} />

                    <Row>

                        {this.state.courses ?
                            this.state.filteredCourses.map(elm =>
                                <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavs={this.props.updateFavs} />)
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