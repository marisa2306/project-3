import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../../shared/PageAnimation/PageAnimation'
import CoursesService from './../../../service/courses.service'
import FilesService from './../../../service/upload.service'
import Loader from '../../shared/Spinner/Loader'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './New-Course-form.css'


class NewCourseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {
                title: '',
                lead: '',
                description: '',
                category: '',
                difficultyLevel: '',
                whatYouWillLearn: [],
                price: '',
                duration: '',
                requirements: [],
                imageUrl: this.props.teacherInfo.imageUrl || '',
                owner: this.props.teacherInfo._id || ''
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
            .then(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'New course created!', '#d4edda')
            })
            .catch(err => this.props.handleToast(true, err.response.data.message[0].msg, '#f8d7da'))
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
            .catch(err => this.props.handleToast(true, err.response.data.message, '#f8d7da'))
    }


    render() {
        return (
            <motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
                <Container>
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h1 className="mt-5">Create New Course</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder='Eye-catching title' required />
                                </Form.Group>

                                <Form.Group controlId="lead">
                                    <Form.Label>Lead Paragraph</Form.Label>
                                    <Form.Control type="text" name="lead" value={this.state.lead} onChange={this.handleInputChange} placeholder='Eye-catching phrase' required />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' name="description" value={this.state.description} onChange={this.handleInputChange} placeholder='Describe your course' required />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId='difficultyLevel'>
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control as='select' name='difficultyLevel' value={this.state.difficultyLevel} onChange={this.handleInputChange}>
                                                <option>Choose one option</option>
                                                <option value='All levels' >All levels</option>
                                                <option value='Beginner' >Beginner</option>
                                                <option value='Intermidiate' >Intermidiate</option>
                                                <option value='Advanced' >Advanced</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="whatYouWillLearn">
                                    <Form.Label>Main Topics</Form.Label>
                                    <Form.Control as='textarea' name="whatYouWillLearn" value={this.state.whatYouWillLearn} onChange={this.handleInputChange} placeholder='The main topics your students will learn' required />
                                    <Form.Text id='whatYouWillLearn' muted>Separate topics with commas</Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} min='0' placeholder="Don't be greedy..." required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="duration">
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control type="number" name="duration" value={this.state.duration} onChange={this.handleInputChange} min='0' placeholder='How many hours?' required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="requirements">
                                    <Form.Label>Requirements</Form.Label>
                                    <Form.Control as='textarea' name="requirements" value={this.state.requirements} onChange={this.handleInputChange} placeholder='What is necessary to stay on course?' />
                                    <Form.Text id='requirements' muted>Separate requirements with commas</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="videos">
                                    <Form.Label>Videos</Form.Label>
                                    <Form.Control as='textarea' name="videos" value={this.state.videos} onChange={this.handleInputChange} placeholder='Include here the URLs of your content (audio or video)' />
                                    <Form.Text id='videos' muted>Separate URLs with commas</Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Image (file: jpg or png) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button className="mt-3 add-course" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Create course'}</Button>
                            </Form>
                            {this.state.uploadingActive || <Link to={`/teachers/${this.props.teacherInfo._id}`} className="btn btn-outline-dark mt-5" disabled>Go back</Link>}
                        </Col>
                    </Row>

                </Container>
            </motion.div>
        )
    }
}

export default NewCourseForm