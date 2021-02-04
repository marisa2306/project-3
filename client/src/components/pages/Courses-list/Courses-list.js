import React, { Component } from 'react'
import { motion } from 'framer-motion'
import CoursesService from './../../../service/courses.service'
import SearchBar from './../../shared/SearchBar/SearchBar'
import NoMatchesMsg from '../../shared/NoMatches-message/NoMatches-msg.js'
import CourseCard from '../../shared/CourseCard/Course-card'
import Loader from './../../shared/Spinner/Loader'
import './Course-list.css'

import { Container, Row } from 'react-bootstrap'

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
                this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                <section className="container-fluid courses-hero">

                    <Container>
                        <div className="heading">
                            <h1 className="mt-5">Our courses</h1>
                            <p>Help individuals reach their goals and pursue their dreams.</p>
                            <SearchBar filterBySearch={this.filterBySearch} filterByCategory={this.filterByCategory} filterByLevel={this.filterByLevel} sortBy={this.sortBy} />
                        </div>
                    </Container>

                </section>
                <section className="courses-list">
                    <Container >
                        <Row>
                            {this.state.courses && this.state.filteredCourses ?
                                this.state.filteredCourses.length === 0 ?
                                    <NoMatchesMsg />
                                    :
                                this.state.filteredCourses.map(elm =>
                                    <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavCourses={this.props.updateFavCourses} />)
                                :
                                <Loader />
                            }
                            
                            {/* {this.state.courses ?
                                this.state.filteredCourses.map(elm =>
                                    <CourseCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} updateFavCourses={this.props.updateFavCourses} />)
                                :
                                <Loader />
                            } */}
                        </Row>
                    </Container>
                </section>

            </motion.div>
        )
    }
}

export default CoursesList