import React, { Component } from 'react'
import CoursesService from './../../../service/auth.service'

import { Form, Button } from 'react-bootstrap'

class EditCourseForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            category: '',
            difficultyLevel: '',
            whatYouWillLearn: '',
            priceRanges: '',
            duration: '',
            requirements: '',
            owner: this.props.loggedUser ? this.props.loggedUser._id : ''
        }
        this.coursesService = new CoursesService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.coursesService
            .editCourse(this.state)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <h1>Edit Course</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="difficultyLevel">
                        <Form.Label>Difficulty Level</Form.Label>
                        <Form.Control type="text" name="difficultyLevel" value={this.state.difficultyLevel} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="whatYouWillLearn">
                        <Form.Label>Main Topics</Form.Label>
                        <Form.Control type="text" name="whatYouWillLearn" value={this.state.whatYouWillLearn} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="priceRanges">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="priceRanges" value={this.state.priceRanges} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="duration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="number" name="duration" value={this.state.duration} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="requirements">
                        <Form.Label>Requirements</Form.Label>
                        <Form.Control type="text" name="requirements" value={this.state.requirements} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Create course</Button>
                </Form>
            </>
        )
    }
}

export default EditCourseForm