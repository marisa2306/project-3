import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TeachersService from '../../../service/teachers.service'

import TeacherCard from './TeacherCard'
import Loader from '../../shared/Spinner/Loader'

import { Container, Row } from 'react-bootstrap'

class TeachersList extends Component {
    constructor() {
        super()
        this.state = {
            teachers: undefined
        }
        this.teachersService = new TeachersService()
    }

    componentDidMount = () => this.refreshTeachers()

    refreshTeachers = () => {
        this.teachersService
            .getTeachers()
            .then(res => this.setState({ teachers: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Container>

                    <h1>Our teachers</h1>

                    <Row>
                        { this.state.teachers ? this.state.teachers.map(elm =>
                            <TeacherCard key={elm._id} {...elm} userInfo={this.props.loggedUser} teacher={this.props.teacherInfo} />)
                                :
                                <Loader />
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export default TeachersList