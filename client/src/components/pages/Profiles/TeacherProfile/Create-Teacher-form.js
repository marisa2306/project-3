import React, { Component } from 'react'
import TeachersService from './../../../../service/teachers.service'

import { Form, Button } from 'react-bootstrap'

class NewTeacherForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jobOccupation: '',
            description: '',
            // links: '',
            user: this.props.loggedUser ? this.props.loggedUser._id : ''
        }
        this.teachersService = new TeachersService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.teachersService
            .saveTeacher(this.state)
            .then(res => {
                // this.props.updateList()
                // this.props.closeModal()
                this.props.history.push('/teacher-profile')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <h1>Create your teacher Profile</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Job Occupation</Form.Label>
                        <Form.Control type="text" name="jobOccupation" value={this.state.jobOccupation} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>
                    {/* <Form.Group controlId="category">
                        <Form.Label>Links</Form.Label>
                        <Form.Control type="text" name="links" value={this.state.links} onChange={this.handleInputChange} />
                    </Form.Group> */}


                    <Button variant="dark" type="submit">Create Teacher profile</Button>
                </Form>
            </>
        )
    }
}

export default NewTeacherForm