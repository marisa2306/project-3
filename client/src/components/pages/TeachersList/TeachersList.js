import React, { Component } from 'react'
import TeachersService from '../../../service/teachers.service'
import SearchBar from './../../shared/SearchBar/SearchBar'
import TeacherCard from './TeacherCard'
import Loader from '../../shared/Spinner/Loader'

import { Container, Row } from 'react-bootstrap'

class TeachersList extends Component {
    constructor() {
        super()
        this.state = {
            teachers: undefined,
            filteredTeachers: []
        }
        this.teachersService = new TeachersService()
    }

    componentDidMount = () => this.refreshTeachers()

    refreshTeachers = () => {
        this.teachersService
            .getTeachers()
            .then(res => this.setState({ teachers: res.data, filteredTeachers: [...res.data] }))
            .catch(err => console.log(err))   //  TO-DO -- ¿qué hacemos con esto?
    }

    filterBySearch = value => this.setState({ filteredTeachers: [...this.state.teachers].filter(elm => elm.name.toLowerCase().includes(value.toLowerCase())) })

    sortBy = option => {
        const filteredTeachersCopy = [ ...this.state.filteredTeachers ]
        switch (option) {
            case 'Name-A': this.setState({ filteredTeachers: filteredTeachersCopy.sort((a, b) => (a.name > b.name) ? 1 : -1) })
                break;
            case 'Name-Z': this.setState({ filteredTeachers: filteredTeachersCopy.sort((a, b) => (a.name < b.name) ? 1 : -1) })
                break;
            default:    this.setState({filteredTeachers: [...this.state.teachers] })
                break;
        }
    }

    render() {
        return (
            <>
                <Container>

                    <h1>Our teachers</h1>

                    <SearchBar filterBySearch={this.filterBySearch} sortBy={this.sortBy} />

                    <Row>
                        { this.state.teachers ? this.state.filteredTeachers.map(elm =>
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