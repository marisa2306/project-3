import React, { Component } from 'react'
import CoursesService from './../../../service/courses.service'
import FilesService from './../../../service/upload.service'
import Loader from '../../shared/Spinner/Loader'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

class NewCourseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {
                title: '',
                description: '',
                category: '',
                difficultyLevel: '',
                whatYouWillLearn: [],
                price: '',
                duration: '',
                requirements: [],
                owner: this.props.teacherInfo ? this.props.teacherInfo._id : ''
            },
            uploadingActive: false
        }
        this.coursesService = new CoursesService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => this.setState({ course: { ...this.state.course, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.coursesService
            .saveCourse(this.state.course)
            .then(res => {
                this.props.history.push('/profile-teacher')
                // this.props.handleToast(true, 'Course created!')      TO-DO
            })
            .catch(err => console.log(err))
    }

    handleImageUpload = e => {
        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    course: { ...this.state.course, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }


    render() {
        return (
            <>
                <Container>
                    <Row>
                        <h1>Create New Course</h1>
                        <hr />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' name="description" value={this.state.description} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as='select' name='category' value={this.state.category} onChange={this.handleInputChange}>
                                        <option>Choose one option</option>
                                        <option value='Design' >Design</option>
                                        <option value='Development' >Development</option>
                                        <option value='Marketing' >Marketing</option>
                                        <option value='Music' >Music</option>
                                        <option value='Other' >Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='difficultyLevel'>
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as='select' name='difficultyLevel' value={this.state.difficultyLevel} onChange={this.handleInputChange}>
                                        <option>Choose one option</option>
                                        <option value='Beginner' >Beginner</option>
                                        <option value='Intermidiate' >Intermidiate</option>
                                        <option value='Advanced' >Advanced</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="whatYouWillLearn">
                                    <Form.Label>Main Topics</Form.Label>
                                    <Form.Control type="text" name="whatYouWillLearn" value={this.state.whatYouWillLearn} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} min='0' />
                                </Form.Group>
                                <Form.Group controlId="duration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="number" name="duration" value={this.state.duration} onChange={this.handleInputChange} min='0' />
                                </Form.Group>
                                <Form.Group controlId="requirements">
                                    <Form.Label>Requirements</Form.Label>
                                    <Form.Control type="text" name="requirements" value={this.state.requirements} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Image (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Create course'}</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default NewCourseForm