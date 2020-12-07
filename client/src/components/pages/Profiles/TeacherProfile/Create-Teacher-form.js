import React, { Component } from 'react'
import TeachersService from './../../../../service/teachers.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class NewTeacherForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jobOccupation: '',
            description: '',
            links: [{
                name: '',
                url: ''
            }],
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
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2}}>
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
                            
                        {/* <Form.Label><strong>Links</strong></Form.Label> 
                        <Form.Row>
                            <Form.Group as={Col} md='6' controlId="linkName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.links.name} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="linkUrl">
                                <Form.Label>Url</Form.Label>
                                <Form.Control type="text" name="url" value={this.state.links.url} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row> */}

                        <Button variant="dark" type="submit">Create Teacher profile</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewTeacherForm